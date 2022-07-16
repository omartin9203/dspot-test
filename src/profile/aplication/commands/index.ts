import { CreateProfileCommandHandler } from './handler/create-profile.command.handler';
import { DeleteProfileCommandHandler } from './handler/delete-profile.command.handler';
import { UpdateProfileCommandHandler } from './handler/update-profile.command.handler';
import { GenerateProfilesCommandHandler } from './handler/generate-profiles.command.handler';

export const ProfileCommandsHandlers = [
  CreateProfileCommandHandler,
  DeleteProfileCommandHandler,
  UpdateProfileCommandHandler,
  GenerateProfilesCommandHandler,
];
