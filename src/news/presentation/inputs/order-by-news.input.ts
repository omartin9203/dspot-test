import {OrderByType} from "../../../shared/core/presentation/enums/orderby-enum.input";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class OrderByNewsInput {
  @Field(() => OrderByType, { nullable: true })
  author?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  title?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  storyTitle?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  storyUrl?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  url?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  active?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  externalId?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  createdAtTS?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  createdAt?: OrderByType;
}