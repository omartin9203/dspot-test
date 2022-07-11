import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneProfileQuery } from '../impl/find-one-profile.query';
import {
  FindOneProfileUseCase,
  FindOneProfileUseCaseResponse,
} from '../../use-cases/find-one-profile/find-one-profile.use-case';

@QueryHandler(FindOneProfileQuery)
export class FindOneProfileQueryHandler implements IQueryHandler<FindOneProfileQuery> {
  constructor(readonly _useCase: FindOneProfileUseCase) {}
  async execute({ request }: FindOneProfileQuery): Promise<FindOneProfileUseCaseResponse> {
    return await this._useCase.execute(request);
  }
}
