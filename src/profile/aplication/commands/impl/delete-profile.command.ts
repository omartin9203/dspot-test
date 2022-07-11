import { DeleteProfileDto } from '../../dto/delete-profile.dto';

export class DeleteProfileCommand {
  constructor(public request: DeleteProfileDto) {}
}
