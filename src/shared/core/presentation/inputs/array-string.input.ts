import { Field, InputType } from '@nestjs/graphql';
import { ArrayFieldOptions } from '../../../modules/data-access/types/IArrayFieldOptions';

/**
 * Options to filter by a String Array. You only can use a field at a time.
 *
 * @export
 * @class ArrayStringFieldOptions
 * @implements {ArrayFieldOptions<string>}
 */
@InputType({
  description:
    'Options to filter by a String Array. You only can use a field at a time.',
})
export class ArrayStringFieldOptions implements ArrayFieldOptions<string> {
  @Field(() => Boolean, { nullable: true })
  isNull?: boolean;
  @Field(() => [String], { nullable: true })
  is?: string[];
  @Field(() => [String], { nullable: true })
  containAll?: string[];
  @Field(() => [String], { nullable: true })
  containAny?: string[];
  @Field({ nullable: true })
  include?: string;
  @Field({ nullable: true })
  length?: number;
}