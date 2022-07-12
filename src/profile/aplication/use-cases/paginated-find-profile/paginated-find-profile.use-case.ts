import { PaginatedFindProfileUseCaseDto } from '../../dto/paginated-find-profile-use-case.dto';
import { Inject, Injectable } from '@nestjs/common';
import { BaseUseCase } from '../../../../shared/core/application/BaseUseCase';
import { IProfileRepository, OrderByProfile, WhereProfile } from '../../../domain/interfeces/IProfileRepository';
import { Result } from '../../../../shared/core/domain/Result';
import { PaginatedFindResult } from '../../../../shared/core/application/PaginatedFindResult';
import { Profile } from '../../../domain/entities/profile.entity';
import { PageParams } from '../../../../shared/core/application/PaginatorParams';
import { AppError } from '../../../../shared/core/domain/errors/AppError';

export type PaginatedFindProfileUseCaseResp = Result<PaginatedFindResult<Profile>>;

@Injectable()
export class PaginatedFindProfileUseCase extends BaseUseCase<
  PaginatedFindProfileUseCaseDto,
  PaginatedFindProfileUseCaseResp
> {
  constructor(
    @Inject('IProfileRepository')
    private readonly _repository: IProfileRepository
  ) {
    super();
  }
  async execute(request: PaginatedFindProfileUseCaseDto): Promise<PaginatedFindProfileUseCaseResp> {
    this._logger.log('Executing...');
    const pageParamsOrErr = PageParams.create({
      pageNum: 1,
      pageLimit: 10,
      ...(request.pageParams ?? {}),
    });
    if (pageParamsOrErr.isFailure) {
      return Result.Fail(pageParamsOrErr.unwrapError());
    }
    const pageParams = pageParamsOrErr.unwrap();
    request.where =
      request.where instanceof Array ? (request.where.length ? request.where : [{}]) : [request.where ?? {}];

    try {
      const paginated = await this._repository.getAllPaginated(pageParams, request.where, request.order);
      return Result.Ok(paginated);
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }
}
