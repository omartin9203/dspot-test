import { FindOneProfileDto } from '../../dto/find-one-profile.dto';

export class FindOneProfileQuery {
  constructor(public request: FindOneProfileDto) {}
}
