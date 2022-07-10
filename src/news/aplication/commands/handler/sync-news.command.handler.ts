import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SyncNewsCommand} from "../impl/sync-news.command";
import {Result} from "../../../../shared/core/domain/Result";
import {SyncNewsUseCase} from "../../use-cases/sync-news/sync-news.use-case";

@CommandHandler(SyncNewsCommand)
export class SyncNewsCommandHandler implements ICommandHandler<SyncNewsCommand> {
  constructor(
    readonly _useCase: SyncNewsUseCase,
  ) { }
  async execute(_: SyncNewsCommand): Promise<Result<void>> {
    return await this._useCase.execute();
  }
}