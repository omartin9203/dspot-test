import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {PaginatedFindNewsQuery} from "../impl/paginated-find-news.query";
import {
  PaginatedFindNewsUseCase,
  PaginatedFindNewsUseCaseResp
} from "../../use-cases/paginated-find-news/paginated-find-news.use-case";

@QueryHandler(PaginatedFindNewsQuery)
export class PaginatedFindNewsQueryHandler implements IQueryHandler<PaginatedFindNewsQuery> {
  constructor(
    readonly _useCase: PaginatedFindNewsUseCase,
  ) { }
  async execute({request}: PaginatedFindNewsQuery): Promise<PaginatedFindNewsUseCaseResp> {
    return await this._useCase.execute(request);
  }
}