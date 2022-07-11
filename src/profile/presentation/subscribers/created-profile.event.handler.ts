import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CreatedProfileEvent } from '../../domain/events/created-profile.event';
import { PUB_SUB } from '../../../shared/modules/graphql/gql-pubsub.provider';
import { ProfileEventsEnum } from '../../domain/events/profile-events.enum';

@EventsHandler(CreatedProfileEvent)
export class CreatedProfileEventHandler implements IEventHandler<CreatedProfileEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub, readonly _qBus: QueryBus) {
    this._logger = new Logger(this.constructor.name);
  }

  handle({ payload: onCreatedProfile }: CreatedProfileEvent): void {
    this._logger.log('Publish Created Profile event');
    this._pubsub.publish(ProfileEventsEnum.CREATED_PROFILE, { onCreatedProfile });
  }
}
