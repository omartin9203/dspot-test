import {INewsRepositoryFactory} from "../../domain/interfeces/INewsRepositoryFactory";
import {INewsRepository} from "../../domain/interfeces/INewsRepository";
import {NewsRepository} from "./news.repository";
import {Connection} from "mongoose";
import {NewsEntity} from "../entities/news.entity";

export class NewsRepositoryFactory
  implements INewsRepositoryFactory {

  build(connection: Connection): INewsRepository {
    return new NewsRepository(
      connection.model<NewsEntity>(NewsEntity.name),
    );
  }
}
