import { Inject, Injectable } from '@nestjs/common';
import { EventPublisher, QueryBus } from '@nestjs/cqrs';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import { Result } from '../../../../shared/core/domain/Result';
import { CreateProfileDto } from '../../dto/create-profile.dto';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { Profile } from '../../../domain/entities/profile.entity';
import { AppError } from '../../../../shared/core/domain/errors/AppError';
import { IProfileRepositoryFactory } from '../../../domain/interfeces/IProfileRepositoryFactory';
import { IUnitOfWork, IUnitOfWorkFactory } from '../../../../shared/core/domain/interfaces/IUnitOfWork';

@Injectable()
export class CreateProfileUseCase extends BaseUseCase<CreateProfileDto, Result<void>> {
  constructor(
    @Inject('IProfileRepositoryFactory')
    private readonly _factory: IProfileRepositoryFactory,
    @Inject('IUnitOfWorkFactory')
    private readonly _unitOfWorkFact: IUnitOfWorkFactory,
    private readonly _qBus: QueryBus,
    private readonly _publisher: EventPublisher
  ) {
    super();
  }

  async execute(input: CreateProfileDto): Promise<Result<void>> {
    this._logger.log('Executing...');
    const itemOrErr = Profile.new(input);
    if (itemOrErr.isFailure) {
      return Result.Fail(itemOrErr.unwrapError());
    }
    const item = itemOrErr.unwrap();
    try {
      const unitOfWork: IUnitOfWork = this._unitOfWorkFact.build();
      await unitOfWork.start();
      const repository: IProfileRepository = unitOfWork.getRepository(this._factory);
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
