import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  GenerateProfilesUseCase,
  GenerateProfilesUseCaseResp,
} from '../../use-cases/generate-profiles/generate-profiles.use-case';
import { GenerateProfilesCommand } from '../impl/generate-profiles.command';

@CommandHandler(GenerateProfilesCommand)
export class GenerateProfilesCommandHandler
  implements ICommandHandler<GenerateProfilesCommand, GenerateProfilesUseCaseResp>
{
  constructor(readonly _useCase: GenerateProfilesUseCase) {}
  async execute({ request }: GenerateProfilesCommand): Promise<GenerateProfilesUseCaseResp> {
    return await this._useCase.execute(request);
  }
}
