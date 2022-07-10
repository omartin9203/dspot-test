import {DomainEntity} from "../../../shared/core/domain/entity.abstract";
import {Result} from "../../../shared/core/domain/Result";
import {NewsErrors} from "../errors/news.errors";
import {UniqueEntityID} from "../../../shared/core/domain/UniqueEntityID";
import {Guard} from "../../../shared/core/domain/Guard";
import {AppError} from "../../../shared/core/domain/errors/AppError";
import Optional from "../../../shared/core/domain/Option";

export type NewsProps = {
  author: string;
  title?: string;
  storyTitle?: string;
  storyUrl?: string;
  url?: string;
  createdAt: Date;
  active: boolean;
  externalId?: string;
  createdAtTS?: number
}

export type CreateNewsProps = Omit<NewsProps, 'active'>

export class News extends DomainEntity<NewsProps> {
  get author(): string {
    return this.props.author;
  }

  get title(): Optional<string> {
    return Optional(this.props.title);
  }

  get storyTitle(): Optional<string> {
    return Optional(this.props.storyTitle);
  }

  get url(): Optional<string> {
    return Optional(this.props.url);
  }

  get storyUrl(): Optional<string> {
    return Optional(this.props.storyUrl);
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get externalId(): Optional<string> {
    return Optional(this.props.externalId);
  }

  get createdAtTS(): Optional<number> {
    return Optional(this.props.createdAtTS);
  }

  toDisable(): Result<void> {
    if(!this.active)
      return Result.Fail(new NewsErrors.NewsIsAlreadyUnavailable(this._id.toString()));
    this.props.active = false;
    return Result.Ok();
  }

  public static new(props: CreateNewsProps): Result<News> {
    const id = new UniqueEntityID();
    return this.create({
      ...props,
      active: true,
    }, id);
  }

  public static create(props: NewsProps, id: UniqueEntityID): Result<News> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.author, argumentPath: 'author' },
      { argument: props.createdAt, argumentPath: 'createdAt' },
    ]);
    if (!nullGuard.succeeded) {
      return Result.Fail(new AppError.ValidationError(nullGuard.message));
    }
    if(!props.title && !props.storyTitle)
      return Result.Fail(new AppError.ValidationError(`'story_title' or 'title' are required`));
    return Result.Ok(new News(props, id));
  }
}