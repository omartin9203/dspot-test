import { PaginatedFindProfileUseCaseDto } from '../../dto/paginated-find-profile-use-case.dto';

export class PaginatedFindProfileQuery {
  constructor(public request: PaginatedFindProfileUseCaseDto) {}
}
