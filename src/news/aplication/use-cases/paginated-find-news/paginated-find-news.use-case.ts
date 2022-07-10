import {PaginatedFindNewsUseCaseDto} from "../../dto/paginated-find-news-use-case.dto";
import {Inject, Injectable} from "@nestjs/common";
import {BaseUseCase} from "../../../../shared/core/application/BaseUseCase";
import {INewsRepository, OrderByNews, WhereNews} from "../../../domain/interfeces/INewsRepository";
import {Result} from "../../../../shared/core/domain/Result";
import {PaginatedFindResult} from "../../../../shared/core/application/PaginatedFindResult";
import {News} from "../../../domain/entities/news.entity";
import {PageParams} from "../../../../shared/core/application/PaginatorParams";
import {AppError} from "../../../../shared/core/domain/errors/AppError";

export type PaginatedFindNewsUseCaseResp = Result<PaginatedFindResult<News>>;

@Injectable()
export class PaginatedFindNewsUseCase
  extends BaseUseCase<PaginatedFindNewsUseCaseDto, PaginatedFindNewsUseCaseResp> {
  constructor(
    @Inject('INewsRepository')
    private readonly _repository: INewsRepository,
  ) {
    super()
  }
  async execute(
    request: PaginatedFindNewsUseCaseDto,
  ): Promise<PaginatedFindNewsUseCaseResp> {
    this._logger.log('Executing...');
    const pageParamsOrErr = PageParams.create(request.pageParams);
    if (pageParamsOrErr.isFailure) {
      return Result.Fail(pageParamsOrErr.unwrapError());
    }
    const pageParams = pageParamsOrErr.unwrap();
    request.where = request.where instanceof Array
      ? request.where.length ? request.where : [{}]
      : [request.where ?? {}]
    const where = request.where.map(x => Object.assign(x, {
      active: { is: true },
    } as WhereNews));
    const order = Object.assign(request.order ?? {}, {
      createdAt: "DESC",
    } as OrderByNews)
    try {
      const paginated = await this._repository.getAllPaginated(pageParams, where, order);
      return Result.Ok(paginated);
    } catch (err) {
      return Result.Fail(new AppError.UnexpectedError(err));
    }
  }
}
