import {Field, InputType} from "@nestjs/graphql";
import {IntFieldOptions} from "../../../shared/core/presentation/inputs/int.input";
import {StringFieldOptions} from "../../../shared/core/presentation/inputs/string.input";
import {DateFieldOptions} from "../../../shared/core/presentation/inputs/date.input";
import {BooleanFieldOptions} from "../../../shared/core/presentation/inputs/boolean.input";

@InputType()
export class WhereNewsInput {
  @Field(() => StringFieldOptions, { nullable: true })
  storyTitle?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  title?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  author?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  storyUrl?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  url?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  externalId?: StringFieldOptions;
  @Field(() => IntFieldOptions, { nullable: true })
  createdAtTS?: IntFieldOptions;
  @Field(() => DateFieldOptions, { nullable: true })
  createdAt?: DateFieldOptions;
  @Field(() => BooleanFieldOptions, { nullable: true })
  active?: BooleanFieldOptions;
}