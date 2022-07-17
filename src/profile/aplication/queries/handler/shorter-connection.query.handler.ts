import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ShorterConnectionQuery } from '../impl/shorter-connection.query';
import {
  ShorterConnectionUseCase,
  ShorterConnectionUseCaseResp,
} from '../../use-cases/shorter-connection/shorter-connection.use-case';

@QueryHandler(ShorterConnectionQuery)
export class ShorterConnectionQueryHandler implements IQueryHandler<ShorterConnectionQuery> {
  constructor(readonly _useCase: ShorterConnectionUseCase) {}
  async execute({ request }: ShorterConnectionQuery): Promise<ShorterConnectionUseCaseResp> {
    return await this._useCase.execute(request);
  }
}
