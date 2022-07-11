import { ObjectType } from '@nestjs/graphql';
import { ProfileDto } from './profile.response';
import { Profile } from '../../domain/entities/profile.entity';
import { ProfileMapper } from '../../infrastructure/mapper/profile.mapper';
import getGenericPaginatedFindResult from '../../../shared/core/presentation/responses/paginated-find.response';

@ObjectType()
export class PaginatedProfilesResponse extends getGenericPaginatedFindResult(ProfileDto) {
  constructor(items: Profile[], limit: number, currentPage: number, totalPages: number, totalItems: number) {
    super({
      items: items.map(entity => ProfileMapper.DomainToDto(entity)),
      limit,
      currentPage,
      totalPages,
      totalItems,
    });
  }
}
