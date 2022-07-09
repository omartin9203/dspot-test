import { Field, InputType, Int } from '@nestjs/graphql';
import { ArrayFieldOptions } from '../../../modules/data-access/types/IArrayFieldOptions';

/**
 * Options to filter by a Int Array. You only can use a field at a time.
 *
 * @export
 * @class ArrayIntFieldOptions
 * @implements {ArrayFieldOptions<number>}
 */
@InputType({
  description:
    'Options to filter by a Int Array. You only can use a field at a time.',
})
export class ArrayIntFieldOptions implements ArrayFieldOptions<number> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => [Int], { nullable: true })
  is?: number[];
  @Field(() => [Int], { nullable: true })
  containAll?: number[];
  @Field(() => [Int], { nullable: true })
  containAny?: number[];
  @Field({ nullable: true })
  include?: number;
  @Field({ nullable: true })
  length?: number;
}