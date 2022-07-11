import { InputType, Field } from '@nestjs/graphql';
import {
  IQuantitativeFieldOptions,
  IBetween,
} from 'src/shared/modules/data-access/types/IQuantitativeFieldOptions';

@InputType()
export class BetweenDate implements IBetween<Date> {
  @Field(() => Date)
  from: Date;
  @Field(() => Date)
  to: Date;
}
/**
 * Options to filter by a Date object. You only can use a field at a time.
 *
 * @export
 * @class DateFieldOptions
 * @implements {IQuantitativeFieldOptions<Date>}
 */
@InputType({
  description:
    'Options to filter by a Date object. You only can use a field at a time.',
})
export class DateFieldOptions implements IQuantitativeFieldOptions<Date> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => Date, { nullable: true })
  is?: Date;
  @Field(() => Date, { nullable: true })
  not?: Date;
  @Field(() => [Date], { nullable: 'itemsAndList' })
  in?: Date[];
  @Field(() => [Date], { nullable: 'itemsAndList' })
  notIn?: Date[];
  @Field(() => Date, { nullable: true })
  lt?: Date;
  @Field(() => Date, { nullable: true })
  lte?: Date;
  @Field(() => Date, { nullable: true })
  gt?: Date;
  @Field(() => Date, { nullable: true })
  gte?: Date;
  @Field(() => BetweenDate, { nullable: true })
  between?: BetweenDate;
}
