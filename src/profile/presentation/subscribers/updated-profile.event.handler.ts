import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../../../shared/modules/graphql/gql-pubsub.provider';
import { ProfileEventsEnum } from '../../domain/events/profile-events.enum';
import { UpdatedProfileEvent } from '../../domain/events/updated-profile.event';

@EventsHandler(UpdatedProfileEvent)
export class UpdatedProfileEventHandler implements IEventHandler<UpdatedProfileEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub, readonly _qBus: QueryBus) {
    this._logger = new Logger(this.constructor.name);
  }

  handle({ payload: onUpdatedProfile }: UpdatedProfileEvent): void {
    this._logger.log('Publish Updated Profile event');
    this._pubsub.publish(ProfileEventsEnum.UPDATED_PROFILE, { onUpdatedProfile });
  }
}
