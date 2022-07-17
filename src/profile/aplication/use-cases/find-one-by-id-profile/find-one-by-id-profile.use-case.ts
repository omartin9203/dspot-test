import { Injectable, Inject } from '@nestjs/common';
import { Result } from 'src/shared/core/domain/Result';
import { AppError } from 'src/shared/core/domain/errors/AppError';
import { UniqueEntityID } from 'src/shared/core/domain/UniqueEntityID';
import { Profile } from '../../../domain/entities/profile.entity';
import { FindOneByIdProfileDto } from '../../dto/find-one-by-id-profile.dto';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import Optional from '../../../../shared/core/domain/Option';
import { EntityIdValueObject } from '../../../../shared/core/domain/entity-id.value-object';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';

export type FindOneByIdProfileUseCaseResponse = Result<Optional<Profile>>;

@Injectable()
export class FindOneByIdProfileUseCase extends BaseUseCase<FindOneByIdProfileDto, FindOneByIdProfileUseCaseResponse> {
  constructor(
    @Inject('IProfileRepository')
    private readonly _repository: IProfileRepository
  ) {
    super();
  }
  async execute(input: FindOneByIdProfileDto): Promise<FindOneByIdProfileUseCaseResponse> {
    this._logger.log('Executing...');
    const idOrErr = EntityIdValueObject.create({ id: input.id });
    if (idOrErr.isFailure) return Result.Fail(idOrErr.unwrapError());
    const id = new UniqueEntityID(input.id);
    try {
      return Result.Ok(await this._repository.findById(id, input.includes));
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }
}
