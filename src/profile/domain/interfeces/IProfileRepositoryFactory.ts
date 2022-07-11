import { IRepositoryFactory } from '../../../shared/core/domain/interfaces/IRepository';
import { IProfileRepository, ProfileFilterableFields } from './IProfileRepository';
import { Profile } from '../entities/profile.entity';

export type IProfileRepositoryFactory = IRepositoryFactory<
  Profile,
  ProfileFilterableFields,
  string,
  IProfileRepository
>;
