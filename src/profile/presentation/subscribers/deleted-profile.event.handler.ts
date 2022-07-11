import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../../../shared/modules/graphql/gql-pubsub.provider';
import { ProfileEventsEnum } from '../../domain/events/profile-events.enum';
import { DeletedProfileEvent } from '../../domain/events/deleted-profile.event';

@EventsHandler(DeletedProfileEvent)
export class DeletedProfileEventHandler implements IEventHandler<DeletedProfileEvent> {
  private _logger: Logger;
  constructor(@Inject(PUB_SUB) private readonly _pubsub: PubSub, readonly _qBus: QueryBus) {
    this._logger = new Logger(this.constructor.name);
  }

  handle({ payload: onDeletedProfile }: DeletedProfileEvent): void {
    this._logger.log('Publish Deleted Profile event');
    this._pubsub.publish(ProfileEventsEnum.DELETED_PROFILE, { onDeletedProfile });
  }
}
