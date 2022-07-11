import { Injectable, Inject } from '@nestjs/common';
import { Result } from 'src/shared/core/domain/Result';
import { AppError } from 'src/shared/core/domain/errors/AppError';
import { Profile } from '../../../domain/entities/profile.entity';
import { FindOneProfileDto } from '../../dto/find-one-profile.dto';
import { IProfileRepository } from '../../../domain/interfeces/IProfileRepository';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import Optional from '../../../../shared/core/domain/Option';

export type FindOneProfileUseCaseResponse = Result<Optional<Profile>>;

@Injectable()
export class FindOneProfileUseCase extends BaseUseCase<FindOneProfileDto, FindOneProfileUseCaseResponse> {
  constructor(
    @Inject('IProfileRepository')
    private readonly _repository: IProfileRepository
  ) {
    super();
  }
  async execute({ order, where, includes }: FindOneProfileDto): Promise<FindOneProfileUseCaseResponse> {
    this._logger.log('Executing...');
    try {
      return Result.Ok(await this._repository.findOne(where, order, includes));
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }
}
