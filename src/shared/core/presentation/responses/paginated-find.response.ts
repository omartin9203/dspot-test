import { PaginatedFindResult } from '../../application/PaginatedFindResult';
import { Int, Field, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

export default function getGenericPaginatedFindResult<T>(
  Type: ClassType<T>,
): ClassType<PaginatedFindResult<T>> {
  type GenericPaginatedFindParams<T> = {
    items: T[];
    limit: number;
    currentPage: number;
    totalPages: number;
    totalItems?: number;
  };
  @ObjectType({ isAbstract: true })
  class GenericPaginatedFindResponse {
    constructor(data: GenericPaginatedFindParams<T>) {
      this.items = data.items;
      this.limit = data.limit;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
      this.totalItems = data.totalItems;
    }
    @Field(() => [Type])
    items: T[];
    @Field(() => Int)
    limit: number;
    @Field(() => Int)
    currentPage: number;
    @Field(() => Int)
    totalPages: number;
    @Field(() => Int, {nullable: true})
    totalItems?: number;
  }
  return GenericPaginatedFindResponse;
}
