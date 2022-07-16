import { GenerateProfilesDto } from '../../dto/generate-profiles.dto';

export class GenerateProfilesCommand {
  constructor(public request: GenerateProfilesDto) {}
}
