import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileCommand } from '../impl/update-profile.command';
import { Result } from '../../../../shared/core/domain/Result';
import { UpdateProfileUseCase } from '../../use-cases/update-profile/update-profile.use-case';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler implements ICommandHandler<UpdateProfileCommand, Result<void>> {
  constructor(readonly _useCase: UpdateProfileUseCase) {}
  async execute({ request }: UpdateProfileCommand): Promise<Result<void>> {
    return await this._useCase.execute(request);
  }
}
