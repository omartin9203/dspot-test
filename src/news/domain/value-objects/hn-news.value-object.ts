import {ValueObject} from "../../../shared/core/domain/value-object.abstract";
import {Result} from "../../../shared/core/domain/Result";
import {Guard} from "../../../shared/core/domain/Guard";
import {AppError} from "../../../shared/core/domain/errors/AppError";
import {CreateNewsProps} from "../entities/news.entity";

export type HnNewsProps = {
  "created_at": string;
  title?: string | null;
  url?: string | null;
  author: string;
  "story_title"?: string | null,
  "story_url"?: string | null,
  "created_at_i"?: number;
  "objectID"?: string
}

export class HnNewsValueObject extends ValueObject<HnNewsProps> {

  get externalId(): string | undefined {
    return this.props.objectID;
  }

  get createdAtTS(): number | undefined {
    return this.props.created_at_i;
  }

  getNewsProps(): CreateNewsProps {
    return {
      ...this.props,
      createdAt: new Date(this.props.created_at),
      storyTitle: this.props.story_title,
      storyUrl: this.props.story_url,
      externalId: this.props.objectID,
      createdAtTS: this.props.created_at_i,
    }
  }

  static create(props: HnNewsProps): Result<HnNewsValueObject> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.author, argumentPath: 'author' },
      { argument: props.created_at, argumentPath: 'created_at' },
    ]);
    if (!nullGuard.succeeded) {
      return Result.Fail(new AppError.ValidationError(nullGuard.message));
    }
    return Result.Ok(new HnNewsValueObject(props));
  }
}