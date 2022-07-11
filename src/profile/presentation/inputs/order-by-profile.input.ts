import { OrderByType } from '../../../shared/core/presentation/enums/orderby-enum.input';
import { Field, InputType } from '@nestjs/graphql';
import { BaseOrderByEntityInput } from '../../../shared/core/presentation/inputs/base-order-by-entity.input';
import { OrderByProfile } from '../../domain/interfeces/IProfileRepository';

@InputType()
export class OrderByProfileInput extends BaseOrderByEntityInput implements OrderByProfile {
  @Field(() => OrderByType, { nullable: true })
  first_name?: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  last_name: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  phone: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  img: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  address: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  city: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  state: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  zipcode: OrderByType;
  @Field(() => OrderByType, { nullable: true })
  available: OrderByType;
}
