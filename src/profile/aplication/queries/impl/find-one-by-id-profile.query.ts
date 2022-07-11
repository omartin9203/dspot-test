import { FindOneByIdProfileDto } from '../../dto/find-one-by-id-profile.dto';

export class FindOneByIdProfileQuery {
  constructor(public request: FindOneByIdProfileDto) {}
}
