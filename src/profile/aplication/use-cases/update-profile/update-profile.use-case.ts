import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import { UpdateProfileInputDto } from '../../dto/update-profile.dto';
import { Result } from '../../../../shared/core/domain/Result';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { UniqueEntityID } from '../../../../shared/core/domain/UniqueEntityID';
import { ProfileErrors } from '../../../domain/errors/profile.errors';
import { AppError } from '../../../../shared/core/domain/errors/AppError';
import { EventPublisher } from '@nestjs/cqrs';
import { Profile } from '../../../domain/entities/profile.entity';
import { IProfileRepositoryFactory } from '../../../domain/interfeces/IProfileRepositoryFactory';
import { IUnitOfWork, IUnitOfWorkFactory } from '../../../../shared/core/domain/interfaces/IUnitOfWork';

@Injectable()
export class UpdateProfileUseCase extends BaseUseCase<UpdateProfileInputDto, Result<void>> {
  constructor(
    @Inject('IProfileRepositoryFactory')
    private readonly _factory: IProfileRepositoryFactory,
    @Inject('IUnitOfWorkFactory')
    private readonly _unitOfWorkFact: IUnitOfWorkFactory,
    private readonly _publisher: EventPublisher
  ) {
    super();
  }
  async execute({ id, update }: UpdateProfileInputDto): Promise<Result<void>> {
    this._logger.log('Executing...');
    try {
      const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
      await unitOfWork.start();
      const repository: IProfileRepository = unitOfWork.getRepository(this._factory);
      const itemOrNone = await repository.findById(new UniqueEntityID(id));
      if (itemOrNone.isNone()) return Result.Fail(new ProfileErrors.ProfileByCodeDoesNotExist(id));
      const item: Profile = itemOrNone.unwrap();
      item.update(update);
      return await unitOfWork.commit(() => this.work(item, repository));
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }

  private async work(item: Profile, repository: IProfileRepository): Promise<Result<void>> {
    await repository.save(item);
    this._publisher.mergeObjectContext(item);
    item.commit();
    return Result.Ok();
  }
}
