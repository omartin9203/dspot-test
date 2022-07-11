import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from '../impl/create-profile.command';
import { Result } from '../../../../shared/core/domain/Result';
import { CreateProfileUseCase } from '../../use-cases/create-profile/create-profile.use-case';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler implements ICommandHandler<CreateProfileCommand, Result<void>> {
  constructor(readonly _useCase: CreateProfileUseCase) {}
  async execute({ request }: CreateProfileCommand): Promise<Result<void>> {
    return await this._useCase.execute(request);
  }
}
