import { PageParamsDto } from '../../../shared/core/application/PaginatorParams';
import { OrderByProfile, WhereProfile } from '../../domain/interfeces/IProfileRepository';

export type PaginatedFindProfileUseCaseDto = {
  pageParams?: PageParamsDto;
  where?: WhereProfile;
  order?: OrderByProfile;
};
