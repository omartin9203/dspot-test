import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IBetween,
  IQuantitativeFieldOptions,
} from 'src/shared/modules/data-access/types/IQuantitativeFieldOptions';

@InputType()
export class BetweenFloat implements IBetween<number> {
  @Field(() => Float)
  from: number;
  @Field(() => Float)
  to: number;
}

/**
 * Options to filter by a Float object. You only can use a field at a time.
 *
 * @class FloatFieldOptions
 * @implements {IQuantitativeFieldOptions<number>}
 */
@InputType({
  description:
    'Options to filter by a Float object. You only can use a field at a time.',
})
export class FloatFieldOptions implements IQuantitativeFieldOptions<number> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => Float, { nullable: true })
  is?: number;
  @Field(() => Float, { nullable: true })
  not?: number;
  @Field(() => [Float], { nullable: 'itemsAndList' })
  in?: number[];
  @Field(() => [Float], { nullable: 'itemsAndList' })
  notIn?: number[];
  @Field(() => Float, { nullable: true })
  lt?: number;
  @Field(() => Float, { nullable: true })
  lte?: number;
  @Field(() => Float, { nullable: true })
  gt?: number;
  @Field(() => Float, { nullable: true })
  gte?: number;
  @Field(() => BetweenFloat, { nullable: true })
  between?: BetweenFloat;
}
