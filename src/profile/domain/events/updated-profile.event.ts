import { ProfileDto } from "../../presentation/responses/profile.response";

export class UpdatedProfileEvent {
  constructor(public payload: ProfileDto) { }
}
