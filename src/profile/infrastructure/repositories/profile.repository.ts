import { BaseRepository } from '../../../shared/modules/data-access/mongoose/base.respository';
import { Profile } from '../../domain/entities/profile.entity';
import { ProfileEntity } from '../entities/profile.entity';
import {
  IProfileRepository,
  ProfileFilterableFields,
  IncludesTypeProfile,
} from '../../domain/interfeces/IProfileRepository';
import { ProfileMapper } from '../mapper/profile.mapper';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export class ProfileRepository
  extends BaseRepository<Profile, ProfileEntity, ProfileFilterableFields, IncludesTypeProfile>
  implements IProfileRepository {
  constructor(@InjectModel(ProfileEntity.name) model: Model<ProfileEntity>) {
    super(model, ProfileMapper.DomainToPersistent, ProfileMapper.PersistentToDomain, 'ProfileRepository');
  }
}
