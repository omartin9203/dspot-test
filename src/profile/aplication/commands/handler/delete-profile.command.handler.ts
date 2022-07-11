import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProfileCommand } from '../impl/delete-profile.command';
import { Result } from '../../../../shared/core/domain/Result';
import { DeleteProfileUseCase } from '../../use-cases/delete-profile/delete-profile.use-case';

@CommandHandler(DeleteProfileCommand)
export class DeleteProfileCommandHandler implements ICommandHandler<DeleteProfileCommand, Result<void>> {
  constructor(readonly _useCase: DeleteProfileUseCase) {}
  async execute({ request }: DeleteProfileCommand): Promise<Result<void>> {
    return await this._useCase.execute(request);
  }
}
