import { Field, ID, InputType } from '@nestjs/graphql';
import { FieldOptions } from 'src/shared/modules/data-access/types/IFieldOptions';

@InputType({
  description:
    'Options to filter by a id object. You only can use a field at a time.',
})
export class IdFieldOptions implements FieldOptions<string> {
  @Field(() => ID, { nullable: true })
  isNull?: boolean;
  @Field(() => ID, { nullable: true })
  is?: string;
  @Field(() => ID, { nullable: true })
  not?: string;
  @Field(() => [ID], { nullable: 'itemsAndList' })
  in?: string[];
  @Field(() => [ID], { nullable: 'itemsAndList' })
  notIn?: string[];
}
