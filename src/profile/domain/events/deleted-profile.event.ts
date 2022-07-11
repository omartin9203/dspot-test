import { ProfileDto } from '../../presentation/responses/profile.response';

export class DeletedProfileEvent {
  constructor(public payload: ProfileDto) {}
}
