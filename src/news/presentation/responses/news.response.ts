import {Field, ID, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class NewsDto {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  author: string;
  @Field({nullable: true})
  title?: string;
  @Field({nullable: true})
  storyTitle?: string;
  @Field({nullable: true})
  storyUrl?: string;
  @Field({nullable: true})
  url?: string;
  @Field()
  active: boolean;
  @Field({nullable: true})
  externalId?: string;
  @Field({nullable: true})
  createdAtTS?: number;
}