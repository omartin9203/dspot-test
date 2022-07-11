import { PaginatedFindProfileQueryHandler } from './handler/paginated-find-profile.query.handler';
import { FindOneByIdProfileQueryHandler } from './handler/find-one-by-id-money-box-deposit.query.handler';
import { FindOneProfileQueryHandler } from './handler/find-one-profile.query.handler';

export const ProfileQueryHandlers = [
  PaginatedFindProfileQueryHandler,
  FindOneByIdProfileQueryHandler,
  FindOneProfileQueryHandler,
];
