import { Field, InputType } from '@nestjs/graphql';
import { StringFieldOptions } from '../../../shared/core/presentation/inputs/string.input';
import { BooleanFieldOptions } from '../../../shared/core/presentation/inputs/boolean.input';
import { BaseWhereEntityInput } from '../../../shared/core/presentation/inputs/base-where-entity.input';
import { ArrayStringFieldOptions } from '../../../shared/core/presentation/inputs/array-string.input';
import { IntFieldOptions } from '../../../shared/core/presentation/inputs/int.input';

@InputType()
export class WhereProfileInput extends BaseWhereEntityInput {
  @Field(() => StringFieldOptions, { nullable: true })
  first_name?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  last_name?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  phone?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  img?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  address?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  city?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  state?: StringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  zipcode?: StringFieldOptions;
  @Field(() => BooleanFieldOptions, { nullable: true })
  available?: BooleanFieldOptions;
  @Field(() => ArrayStringFieldOptions, { nullable: true })
  friendsIds?: ArrayStringFieldOptions;
  @Field(() => StringFieldOptions, { nullable: true })
  generationCode?: StringFieldOptions;
  @Field(() => IntFieldOptions, { nullable: true })
  generationNumber?: IntFieldOptions;
}
