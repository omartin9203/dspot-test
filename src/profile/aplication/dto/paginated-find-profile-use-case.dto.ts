import { PageParamsDto } from '../../../shared/core/application/PaginatorParams';
import { IncludesTypeProfile, OrderByProfile, WhereProfile } from '../../domain/interfeces/IProfileRepository';

export type PaginatedFindProfileUseCaseDto = {
  pageParams?: PageParamsDto;
  where?: WhereProfile;
  order?: OrderByProfile;
  includes?: IncludesTypeProfile[];
};
