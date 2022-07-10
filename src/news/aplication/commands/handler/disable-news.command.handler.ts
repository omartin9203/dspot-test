import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DisableNewsCommand} from "../impl/disable-news.command";
import {DisableNewsUseCase} from "../../use-cases/disable-news/disable-news.use-case";
import {Result} from "../../../../shared/core/domain/Result";

@CommandHandler(DisableNewsCommand)
export class DisableNewsCommandHandler implements ICommandHandler<DisableNewsCommand> {
  constructor(
    readonly _useCase: DisableNewsUseCase,
  ) {
  }
  async execute({request}: DisableNewsCommand): Promise<Result<void>> {
    return await this._useCase.execute(request);
  }
}