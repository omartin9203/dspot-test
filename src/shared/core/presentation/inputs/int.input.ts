import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IBetween,
  IQuantitativeFieldOptions,
} from 'src/shared/modules/data-access/types/IQuantitativeFieldOptions';

@InputType()
export class BetweenInt implements IBetween<number> {
  @Field(() => Int)
  from: number;
  @Field(() => Int)
  to: number;
}

/**
 * Options to filter by a Int object. You only can use a field at a time.
 *
 * @export
 * @class IntFieldOptions
 * @implements {IQuantitativeFieldOptions<number>}
 */
@InputType({
  description:
    'Options to filter by a Int object. You only can use a field at a time.',
})
export class IntFieldOptions implements IQuantitativeFieldOptions<number> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field({ nullable: true })
  is?: number;
  @Field({ nullable: true })
  not?: number;
  @Field(() => [Int], { nullable: 'itemsAndList' })
  in?: number[];
  @Field(() => [Int], { nullable: 'itemsAndList' })
  notIn?: number[];
  @Field({ nullable: true })
  lt?: number;
  @Field({ nullable: true })
  lte?: number;
  @Field({ nullable: true })
  gt?: number;
  @Field({ nullable: true })
  gte?: number;
  @Field(() => BetweenInt, { nullable: true })
  between?: BetweenInt;
}
