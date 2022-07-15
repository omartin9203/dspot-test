import { Args, ID, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProfileDto } from '../responses/profile.response';
import { BaseResolver } from '../../../shared/core/presentation/BaseResolver';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginatedProfilesResponse } from '../responses/paginated-profile.response';
import { PaginatedFindProfileInput } from '../inputs/paginated-find-profile.input';
import { PaginatedFindProfileQuery } from '../../aplication/queries/impl/paginated-find-profile.query';
import { CurrentLanguage } from '../../../shared/core/presentation/decorators/current-language.decorator';
import { FindOneProfileQuery } from '../../aplication/queries/impl/find-one-profile.query';
import { FindOneProfileInput } from '../inputs/find-one-profile.input';
import { ProfileMapper } from '../../infrastructure/mapper/profile.mapper';
import { FindOneProfileUseCaseResponse } from '../../aplication/use-cases/find-one-profile/find-one-profile.use-case';
import { FindOneByIdProfileQuery } from '../../aplication/queries/impl/find-one-by-id-profile.query';
import { FindOneByIdProfileUseCaseResponse } from '../../aplication/use-cases/find-one-by-id-profile/find-one-by-id-profile.use-case';
import { SuccessResponse } from '../../../shared/core/presentation/responses/success.response';
import { CreateProfileInput } from '../inputs/create-profile.input';
import { CreateProfileCommand } from '../../aplication/commands/impl/create-profile.command';
import { Result } from '../../../shared/core/domain/Result';
import { DeleteProfileCommand } from '../../aplication/commands/impl/delete-profile.command';
import { UpdateProfileInput } from '../inputs/update-profile.input';
import { UpdateProfileCommand } from '../../aplication/commands/impl/update-profile.command';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../../../shared/modules/graphql/gql-pubsub.provider';
import { PubSub } from 'apollo-server-express';
import { ProfileEventsEnum } from '../../domain/events/profile-events.enum';

@Resolver(() => ProfileDto)
export class ProfileResolver extends BaseResolver {
  constructor(
    readonly _cBus: CommandBus,
    readonly _qBus: QueryBus,
    @Inject(PUB_SUB)
    private readonly _pubsub: PubSub
  ) {
    super();
  }

  @Query(() => PaginatedProfilesResponse)
  async getAllProfiles(
    @Args() input: PaginatedFindProfileInput,
    @CurrentLanguage() lang?: string
  ): Promise<PaginatedProfilesResponse> {
    this._logger.log('getAllProfiles...');
    const resp = await this._qBus.execute(
      new PaginatedFindProfileQuery({
        ...input,
        includes: ['friends'],
      })
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    const paginated = resp.unwrap();
    return new PaginatedProfilesResponse(
      paginated.items,
      paginated.limit,
      paginated.currentPage,
      paginated.totalPages,
      paginated.totalItems
    );
  }

  @Query(() => ProfileDto, { nullable: true })
  async findOneProfile(
    @Args() input: FindOneProfileInput,
    @CurrentLanguage() lang?: string
  ): Promise<ProfileDto | null> {
    this._logger.log('findOneProfile...');
    const resp: FindOneProfileUseCaseResponse = await this._qBus.execute(
      new FindOneProfileQuery({ ...input, includes: ['friends'] })
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    const itemOrNone = resp.unwrap().map(ProfileMapper.DomainToDto);
    return itemOrNone.isNone() ? null : itemOrNone.unwrap();
  }

  @Query(() => ProfileDto)
  async findOneByIdProfile(
    @Args('id', { type: () => ID }) id: string,
    @CurrentLanguage() lang?: string
  ): Promise<ProfileDto> {
    this._logger.log('findOneByIdProfile...');
    const resp: FindOneByIdProfileUseCaseResponse = await this._qBus.execute(
      new FindOneByIdProfileQuery({
        id,
        includes: ['friends'],
      })
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    const itemOrNone = resp.unwrap().map(ProfileMapper.DomainToDto);
    return itemOrNone.isNone() ? null : itemOrNone.unwrap();
  }

  @Mutation(() => SuccessResponse)
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @CurrentLanguage() lang?: string
  ): Promise<SuccessResponse> {
    const resp: Result<void> = await this._cBus.execute(new CreateProfileCommand(input));
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    return { success: true };
  }

  @Mutation(() => SuccessResponse)
  async deleteProfile(
    @Args('id', { type: () => ID }) id: string,
    @CurrentLanguage() lang?: string
  ): Promise<SuccessResponse> {
    const resp: Result<void> = await this._cBus.execute(new DeleteProfileCommand({ id }));
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    return new SuccessResponse();
  }

  @Mutation(() => SuccessResponse)
  async updateProfile(
    @Args('id', { type: () => ID }) id: string,
    @Args('update') update: UpdateProfileInput,
    @CurrentLanguage() lang?: string
  ): Promise<SuccessResponse> {
    const resp: Result<void> = await this._cBus.execute(
      new UpdateProfileCommand({
        id,
        update,
      })
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    return new SuccessResponse();
  }

  @Subscription(() => ProfileDto, {
    description: 'Subscribe to a Created Profile',
  })
  onCreatedProfile(): AsyncIterator<ProfileDto> {
    this._logger.log('Subscribed to CreatedProfile event');
    return this._pubsub.asyncIterator<ProfileDto>(ProfileEventsEnum.CREATED_PROFILE);
  }

  @Subscription(() => ProfileDto, {
    description: 'Subscribe to a Updated Profile',
  })
  onUpdatedProfile(): AsyncIterator<ProfileDto> {
    this._logger.log('Subscribed to UpdatedProfile event');
    return this._pubsub.asyncIterator<ProfileDto>(ProfileEventsEnum.UPDATED_PROFILE);
  }

  @Subscription(() => ProfileDto, {
    description: 'Subscribe to a Deleted Profile',
  })
  onDeletedProfile(): AsyncIterator<ProfileDto> {
    this._logger.log('Subscribed to DeletedProfile event');
    return this._pubsub.asyncIterator<ProfileDto>(ProfileEventsEnum.DELETED_PROFILE);
  }
}
