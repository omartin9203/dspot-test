import {NewsEntity} from "../entities/news.entity";
import {News} from "../../domain/entities/news.entity";
import {UniqueEntityID} from "../../../shared/core/domain/UniqueEntityID";
import {NewsDto} from "../../presentation/responses/news.response";

export class NewsMapper {
  public static PersistentToDomain(
    entity: NewsEntity,
  ): News {
    return News.create(
      {
        author: entity.author,
        title: entity.title,
        storyTitle: entity.storyTitle,
        url: entity.url,
        storyUrl: entity.storyUrl,
        createdAt: entity.createdAt,
        active: entity.active,
        externalId: entity.externalId,
        createdAtTS: entity.createdAtTS,
      },
      new UniqueEntityID(entity.id),
    ).unwrap();
  }
  public static DomainToPersistent(
    entity: News,
  ): Partial<NewsEntity> {
    return {
      id: entity._id.toString(),
      author: entity.author,
      title: entity.title.isSome() ? entity.title.unwrap() : null,
      storyTitle: entity.storyTitle.isSome() ? entity.storyTitle.unwrap() : null,
      url: entity.url.isSome() ? entity.url.unwrap() : null,
      storyUrl: entity.storyUrl.isSome() ? entity.storyUrl.unwrap() : null,
      createdAt: entity.createdAt,
      active: entity.active,
      externalId: entity.externalId.isSome() ? entity.externalId.unwrap() : null,
      createdAtTS: entity.createdAtTS.isSome() ? entity.createdAtTS.unwrap() : null,
    };
  }
  public static DomainToDto(
    entity: News,
  ): NewsDto {
    return {
      id: entity._id.toString(),
      author: entity.author,
      title: entity.title.isSome() ? entity.title.unwrap() : null,
      storyTitle: entity.storyTitle.isSome() ? entity.storyTitle.unwrap() : null,
      url: entity.url.isSome() ? entity.url.unwrap() : null,
      storyUrl: entity.storyUrl.isSome() ? entity.storyUrl.unwrap() : null,
      createdAt: entity.createdAt,
      active: entity.active,
      externalId: entity.externalId.isSome() ? entity.externalId.unwrap() : null,
      createdAtTS: entity.createdAtTS.isSome() ? entity.createdAtTS.unwrap() : null,
    };
  }
}
