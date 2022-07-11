import { ProfileEntity } from '../entities/profile.entity';
import { Profile } from '../../domain/entities/profile.entity';
import { UniqueEntityID } from '../../../shared/core/domain/UniqueEntityID';
import { ProfileDto } from '../../presentation/responses/profile.response';

export class ProfileMapper {
  public static PersistentToDomain(entity: ProfileEntity): Profile {
    return Profile.create(
      {
        first_name: entity.first_name,
        last_name: entity.last_name,
        phone: entity.phone,
        img: entity.img,
        address: entity.address,
        city: entity.city,
        state: entity.state,
        zipcode: entity.zipcode,
        available: entity.available,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      },
      new UniqueEntityID(entity.id)
    ).unwrap();
  }
  public static DomainToPersistent(entity: Profile): Partial<ProfileEntity> {
    return {
      id: entity.id.toString(),
      first_name: entity.first_name,
      last_name: entity.last_name,
      phone: entity.phone.isSome() ? entity.phone.unwrap() : undefined,
      img: entity.img.isSome() ? entity.img.unwrap() : undefined,
      address: entity.address.isSome() ? entity.address.unwrap() : undefined,
      city: entity.city.isSome() ? entity.city.unwrap() : undefined,
      state: entity.state.isSome() ? entity.state.unwrap() : undefined,
      zipcode: entity.zipcode.isSome() ? entity.zipcode.unwrap() : undefined,
      available: entity.available,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
  public static DomainToDto(entity: Profile): ProfileDto {
    return {
      id: entity.id.toString(),
      first_name: entity.first_name,
      last_name: entity.last_name,
      phone: entity.phone.isSome() ? entity.phone.unwrap() : undefined,
      img: entity.img.isSome() ? entity.img.unwrap() : undefined,
      address: entity.address.isSome() ? entity.address.unwrap() : undefined,
      city: entity.city.isSome() ? entity.city.unwrap() : undefined,
      state: entity.state.isSome() ? entity.state.unwrap() : undefined,
      zipcode: entity.zipcode.isSome() ? entity.zipcode.unwrap() : undefined,
      available: entity.available,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
