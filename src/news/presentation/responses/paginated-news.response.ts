import {ObjectType} from "@nestjs/graphql";
import {NewsDto} from "./news.response";
import {News} from "../../domain/entities/news.entity";
import {NewsMapper} from "../../infrastructure/mapper/news.mapper";
import getGenericPaginatedFindResult from "../../../shared/core/presentation/responses/paginated-find.response";

@ObjectType()
export class PaginatedFindNewsResult extends getGenericPaginatedFindResult(
  NewsDto,
) {
  constructor(
    items: News[],
    limit: number,
    currentPage: number,
    totalPages: number,
  ) {
    super({
      items: items.map(entity => NewsMapper.DomainToDto(entity)),
      limit,
      currentPage,
      totalPages,
    });
  }
}
