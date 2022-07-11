import { CreateProfileDto } from '../../dto/create-profile.dto';

export class CreateProfileCommand {
  constructor(public request: CreateProfileDto) {}
}
