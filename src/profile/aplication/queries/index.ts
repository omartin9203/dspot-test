import { PaginatedFindProfileQueryHandler } from './handler/paginated-find-profile.query.handler';
import { FindOneProfileQueryHandler } from './handler/find-one-profile.query.handler';
import { FindOneByIdProfileQueryHandler } from './handler/find-one-by-id-profile.query.handler';
import { ShorterConnectionQueryHandler } from './handler/shorter-connection.query.handler';

export const ProfileQueryHandlers = [
  PaginatedFindProfileQueryHandler,
  FindOneByIdProfileQueryHandler,
  FindOneProfileQueryHandler,
  ShorterConnectionQueryHandler,
];
