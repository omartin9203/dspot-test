import {HnNewsValueObject} from "../value-objects/hn-news.value-object";
import {Result} from "../../../shared/core/domain/Result";

export interface IHnNewsClient {
  newsIterable(): AsyncGenerator<Result<HnNewsValueObject>>;
}