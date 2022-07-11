import { CreatedProfileEventHandler } from './created-profile.event.handler';
import { UpdatedProfileEventHandler } from './updated-profile.event.handler';
import { DeletedProfileEventHandler } from './deleted-profile.event.handler';

export const ProfileEventsHandlers = [
  CreatedProfileEventHandler,
  UpdatedProfileEventHandler,
  DeletedProfileEventHandler,
];
