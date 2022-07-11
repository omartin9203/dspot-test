import { IProfileRepositoryFactory } from '../../domain/interfeces/IProfileRepositoryFactory';
import { IProfileRepository } from '../../domain/interfeces/IProfileRepository';
import { ProfileRepository } from './profile.repository';
import { Connection } from 'mongoose';
import { ProfileEntity } from '../entities/profile.entity';

export class ProfileRepositoryFactory implements IProfileRepositoryFactory {
  build(connection: Connection): IProfileRepository {
    return new ProfileRepository(connection.model<ProfileEntity>(ProfileEntity.name));
  }
}
