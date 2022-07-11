import { UpdateProfileInputDto } from '../../dto/update-profile.dto';

export class UpdateProfileCommand {
  constructor(public request: UpdateProfileInputDto) {}
}
