import {PaginatedFindNewsUseCaseDto} from "../../aplication/dto/paginated-find-news-use-case.dto";
import {PageParamsInput} from "../../../shared/core/presentation/inputs/paginator-params.input";
import {ArgsType, Field} from "@nestjs/graphql";
import {WhereNewsInput} from "./where-news.input";
import {OrderByNewsInput} from "./order-by-news.input";

@ArgsType()
export class PaginatedFindNewsInput implements PaginatedFindNewsUseCaseDto {
  @Field(() => PageParamsInput)
  pageParams: PageParamsInput;
  @Field(() => [WhereNewsInput], { nullable: true })
  where?: [WhereNewsInput];
  @Field(() => OrderByNewsInput, { nullable: true })
  order?: OrderByNewsInput;
}