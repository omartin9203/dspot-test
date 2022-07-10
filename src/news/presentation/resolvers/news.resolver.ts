import {Args, ID, Mutation, Query, Resolver} from "@nestjs/graphql";
import {NewsDto} from "../responses/news.response";
import {BaseResolver} from "../../../shared/core/presentation/BaseResolver";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {PaginatedFindNewsResult} from "../responses/paginated-news.response";
import {PaginatedFindNewsInput} from "../inputs/paginated-find-news.input";
import {PaginatedFindNewsUseCaseResp} from "../../aplication/use-cases/paginated-find-news/paginated-find-news.use-case";
import {PaginatedFindNewsQuery} from "../../aplication/queries/impl/paginated-find-news.query";
import {SuccessResponse} from "../../../shared/core/presentation/responses/success.response";
import {Result} from "../../../shared/core/domain/Result";
import {DisableNewsCommand} from "../../aplication/commands/impl/disable-news.command";
import { CurrentLanguage } from '../../../shared/core/presentation/decorators/current-language.decorator';

@Resolver(() => NewsDto)
export class NewsResolver extends BaseResolver {
  constructor(
    readonly _cBus: CommandBus,
    readonly _qBus: QueryBus,
  ) {
    super();
  }

  @Query(() => PaginatedFindNewsResult)
  async findNews(
    @Args() input: PaginatedFindNewsInput,
    @CurrentLanguage() lang?: string,
  ): Promise<PaginatedFindNewsResult> {
    this._logger.log('findNews');
    const resp: PaginatedFindNewsUseCaseResp = await this._qBus.execute(
      new PaginatedFindNewsQuery(input),
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    const paginated = resp.unwrap();
    return new PaginatedFindNewsResult(
      paginated.items,
      paginated.limit,
      paginated.currentPage,
      paginated.totalPages,
    );
  }

  @Mutation(() => SuccessResponse)
  async disableNews(
    @Args('newsId', {type: ()=> ID}) newsId: string,
    @CurrentLanguage() lang?: string,
  ): Promise<SuccessResponse> {
    this._logger.log('disableNews');
    const resp: Result<void> = await this._cBus.execute(
      new DisableNewsCommand({newsId}),
    );
    if (resp.isFailure) this.handleErrors(resp.unwrapError(), lang);
    return new SuccessResponse();
  }
}