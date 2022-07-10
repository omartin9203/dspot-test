import {IHnNewsClient} from "../../domain/interfeces/IHnNewsClient";
import {Result} from "../../../shared/core/domain/Result";
import {HnNewsProps, HnNewsValueObject} from "../../domain/value-objects/hn-news.value-object";
import {HttpService, Injectable, Logger} from "@nestjs/common";
import {AppError} from "../../../shared/core/domain/errors/AppError";

@Injectable()
export class HnNewsClient implements IHnNewsClient {
  readonly URL = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs&page=';

  private readonly _logger: Logger;

  constructor(
    readonly httpService: HttpService,
  ) {
    this._logger = new Logger(HnNewsClient.name);
  }

  async *newsIterable(): AsyncGenerator<Result<HnNewsValueObject>> {
    let page = 0, hasMore;
    do {
      hasMore = false;
      try {
        const { data } = await this.httpService.get<DataResponse>(this.URL + page++).toPromise();
        for (const item of data.hits)
          yield HnNewsValueObject.create(item);
        hasMore = !!data.hits.length;
      } catch (e) {
        const respErr = new AppError.UnexpectedError(e);
        this._logger.error(respErr);
        yield Result.Fail(respErr);
      }
    } while(hasMore)
  }

}

type DataResponse = {
  hits: Array<HnNewsProps>;
}