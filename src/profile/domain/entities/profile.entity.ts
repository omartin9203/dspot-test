import { Result } from '../../../shared/core/domain/Result';
import { ProfileErrors } from '../errors/profile.errors';
import { UniqueEntityID } from '../../../shared/core/domain/UniqueEntityID';
import { Guard } from '../../../shared/core/domain/Guard';
import { AppError } from '../../../shared/core/domain/errors/AppError';
import Optional from '../../../shared/core/domain/Option';
import { EntityBaseProps } from '../../../shared/core/domain/interfaces/IEntity';
import { AggregateDomainEntity } from '../../../shared/core/domain/aggregate-entity.abstract';
import { ProfileMapper } from '../../infrastructure/mapper/profile.mapper';
import { UpdatedProfileEvent } from '../events/updated-profile.event';
import { CreatedProfileEvent } from '../events/created-profile.event';
import { DeletedProfileEvent } from '../events/deleted-profile.event';

export type ProfileProps = {
  first_name: string;
  last_name: string;
  phone?: string;
  img?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  available: boolean;
  friends: Map<string, Optional<Profile>>;

  generationCode?: string;
  generationNumber?: number;
};

export type CreateProfileProps = Omit<ProfileProps, 'createdAt' | 'updatedAt' | 'friends'> & {
  friendsIds?: string[];
};

export class Profile extends AggregateDomainEntity<ProfileProps> {
  get first_name(): string {
    return this.props.first_name;
  }

  get last_name(): string {
    return this.props.last_name;
  }

  get phone(): Optional<string> {
    return Optional(this.props.phone);
  }

  get img(): Optional<string> {
    return Optional(this.props.img);
  }

  get address(): Optional<string> {
    return Optional(this.props.address);
  }

  get city(): Optional<string> {
    return Optional(this.props.city);
  }

  get state(): Optional<string> {
    return Optional(this.props.state);
  }

  get zipcode(): Optional<string> {
    return Optional(this.props.zipcode);
  }

  get available(): boolean {
    return this.props.available;
  }

  get friends(): Map<string, Optional<Profile>> {
    return this.props.friends;
  }

  get generationCode(): Optional<string> {
    return Optional(this.props.generationCode);
  }

  get generationNumber(): Optional<number> {
    return Optional(this.props.generationNumber);
  }

  setUnavailable(): Result<void> {
    if (!this.available) return Result.Fail(new ProfileErrors.ProfileIsAlreadyUnavailable(this.id.toString()));
    this.props.available = false;
    return Result.Ok();
  }

  update(update: Partial<ProfileProps>): void {
    Object.keys(update).forEach(key => (this.props[key] = update[key]));
    this.props.updatedAt = new Date();
    this.launchEventUpdate();
  }

  launchEventUpdate(): void {
    this.apply(new UpdatedProfileEvent(ProfileMapper.DomainToDto(this)));
  }

  onDeleted(): void {
    this.apply(new DeletedProfileEvent(ProfileMapper.DomainToDto(this)));
  }

  addFriendId(friendId: string): void {
    this.props.friends.set(friendId, Optional(null));
    //todo: send event
  }

  addFriend(friend: Profile): Result<void> {
    if (this.id.equals(friend.id))
      return Result.Fail(new ProfileErrors.FriendRelationshipAlreadyExist(this.id.toString(), friend.id.toString()));
    if (!!this.friends.get(friend.id.toString()))
      return Result.Fail(new ProfileErrors.FriendRelationshipAlreadyExist(this.id.toString(), friend.id.toString()));
    this.props.friends.set(friend.id.toString(), Optional(null));
    friend.addFriendId(this.id.toString());
    //todo: send event
    return Result.Ok();
  }

  public static new(props: CreateProfileProps): Result<Profile> {
    const id = new UniqueEntityID();
    const date = new Date();
    const friends = new Map<string, Optional<Profile>>();
    (props.friendsIds ?? []).forEach(x => friends.set(x, Optional(null)));
    return this.create(
      {
        ...props,
        available: props.available ?? true,
        createdAt: date,
        updatedAt: date,
        friends,
      },
      id
    ).map(entity => {
      entity.apply(new CreatedProfileEvent(ProfileMapper.DomainToDto(entity)));
      return entity;
    });
  }

  public static create(props: EntityBaseProps<ProfileProps>, id: UniqueEntityID): Result<Profile> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.first_name, argumentPath: 'first_name' },
      { argument: props.last_name, argumentPath: 'last_name' },
      { argument: props.available, argumentPath: 'available' },
    ]);
    if (!nullGuard.succeeded) {
      return Result.Fail(new AppError.ValidationError(nullGuard.message));
    }
    return Result.Ok(new Profile(props, id));
  }
}
