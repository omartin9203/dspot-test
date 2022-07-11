import { ProfileDto } from '../../presentation/responses/profile.response';

export class CreatedProfileEvent {
  constructor(public payload: ProfileDto) {}
}
