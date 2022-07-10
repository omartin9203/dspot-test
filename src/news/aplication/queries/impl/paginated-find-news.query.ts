import {PaginatedFindNewsUseCaseDto} from "../../dto/paginated-find-news-use-case.dto";

export class PaginatedFindNewsQuery {
  constructor(public request: PaginatedFindNewsUseCaseDto) {
  }
}