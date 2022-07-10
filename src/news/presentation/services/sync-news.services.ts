import {Injectable, Logger} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "../../../shared/core/domain/Result";
import {SyncNewsCommand} from "../../aplication/commands/impl/sync-news.command";
import {SyncNewsUseCase} from "../../aplication/use-cases/sync-news/sync-news.use-case";
import {PaginatedFindNewsUseCase} from "../../aplication/use-cases/paginated-find-news/paginated-find-news.use-case";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class SyncNewsServices {
  private processing = false;
  readonly _logger: Logger;
  constructor(
    readonly cBus: CommandBus,
    readonly syncUseCase: SyncNewsUseCase,
    readonly findUseCase: PaginatedFindNewsUseCase,
  ) {
    this._logger = new Logger(SyncNewsServices.name);
    // this.initialize();
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async syncNews() {
    if(this.processing) return;
    this.processing = true;
    const result: Result<void> = await this.cBus.execute(
      new SyncNewsCommand(),
    );
    if(result.isFailure) {
      this._logger.error(result.unwrapError().pretty());
    }
    this.processing = false;
    this._logger.log('Finished');
  }

  async initialize() {
    let done = false;
    while (!done) {
      try {
        const result = await this.findUseCase.execute({
          pageParams: {pageNum: 1, pageLimit: 1},
        });
        if(result.isSuccess) {
          const {items} = result.unwrap();
          if(items.length) done = true;
          else {
            await this.syncUseCase.execute();
          }
        } else {
          this._logger.error(result.unwrapError().pretty());
        }
      } catch (e) {
        this._logger.error(e);
      }
    }
  }
}
