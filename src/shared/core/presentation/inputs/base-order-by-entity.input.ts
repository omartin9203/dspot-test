import { Field, InputType } from '@nestjs/graphql';
import { OrderByType } from '../enums/orderby-enum.input';

@InputType()
export class BaseOrderByEntityInput {
  @Field(() => OrderByType, { nullable: true })
  createdAt?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  updatedAt?: OrderByType;
}
