import { Field, InputType } from '@nestjs/graphql';
import { IdFieldOptions } from './id.input';
import { DateFieldOptions } from './date.input';

@InputType()
export class BaseWhereEntityInput {
  @Field(() => IdFieldOptions, { nullable: true })
  _id?: IdFieldOptions;
  @Field(() => DateFieldOptions, { nullable: true })
  createdAt?: DateFieldOptions;
  @Field(() => DateFieldOptions, { nullable: true })
  updatedAt?: DateFieldOptions;
}
