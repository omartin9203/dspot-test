import {BaseRepository} from "../../../shared/modules/data-access/mongoose/base.respository";
import {News} from "../../domain/entities/news.entity";
import {NewsEntity} from "../entities/news.entity";
import {INewsRepository, NewsFilterableFields} from "../../domain/interfeces/INewsRepository";
import {NewsMapper} from "../mapper/news.mapper";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

export class NewsRepository
  extends BaseRepository<News, NewsEntity, NewsFilterableFields>
  implements INewsRepository {

  constructor(
    @InjectModel(NewsEntity.name) model: Model<NewsEntity>
  ) {
    super(
      model,
      NewsMapper.DomainToPersistent,
      NewsMapper.PersistentToDomain,
      'NewsRepository'
    );
  }
}