import { ProfileEntity } from '../entities/profile.entity';
import { Profile } from '../../domain/entities/profile.entity';
import { UniqueEntityID } from '../../../shared/core/domain/UniqueEntityID';
import { ProfileDto } from '../../presentation/responses/profile.response';
import Optional from '../../../shared/core/domain/Option';

export class ProfileMapper {
  public static PersistentToDomain(entity: ProfileEntity): Profile {
    const friends = new Map<string, Optional<Profile>>();
    const profiles = entity.friends?.map(ProfileMapper.PersistentToDomain) ?? [];
    entity.friendsIds.forEach(id => friends.set(id, Optional(profiles.find(x => x.id.toString() == id))));
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
        friends,
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
      friendsIds: Array.from(entity.friends.keys()),
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
      friendsIds: Array.from(entity.friends.keys()),
      friends: Array.from(entity.friends.values())
        .filter(x => x.isSome())
        .map(x => this.DomainToDto(x.unwrap())),
    };
  }
}
