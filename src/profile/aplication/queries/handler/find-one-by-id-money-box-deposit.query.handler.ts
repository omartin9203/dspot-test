import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindOneByIdProfileQuery } from '../impl/find-one-by-id-profile.query';
import {
  FindOneByIdProfileUseCase,
  FindOneByIdProfileUseCaseResponse,
} from '../../use-cases/find-one-by-id-profile/find-one-by-id-profile.use-case';

@QueryHandler(FindOneByIdProfileQuery)
export class FindOneByIdProfileQueryHandler implements IQueryHandler<FindOneByIdProfileQuery> {
  constructor(readonly _useCase: FindOneByIdProfileUseCase) {}
  async execute({ request }: FindOneByIdProfileQuery): Promise<FindOneByIdProfileUseCaseResponse> {
    return await this._useCase.execute(request);
  }
}
