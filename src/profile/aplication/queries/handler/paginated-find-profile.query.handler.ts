import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginatedFindProfileQuery } from '../impl/paginated-find-profile.query';
import {
  PaginatedFindProfileUseCase,
  PaginatedFindProfileUseCaseResp,
} from '../../use-cases/paginated-find-profile/paginated-find-profile.use-case';

@QueryHandler(PaginatedFindProfileQuery)
export class PaginatedFindProfileQueryHandler implements IQueryHandler<PaginatedFindProfileQuery> {
  constructor(readonly _useCase: PaginatedFindProfileUseCase) {}
  async execute({ request }: PaginatedFindProfileQuery): Promise<PaginatedFindProfileUseCaseResp> {
    return await this._useCase.execute(request);
  }
}
