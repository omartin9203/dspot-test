import { ArgsType, Field } from '@nestjs/graphql';
import { FindOneProfileDto } from '../../aplication/dto/find-one-profile.dto';
import { WhereProfileInput } from './where-profile.input';
import { OrderByProfileInput } from './order-by-profile.input';

@ArgsType()
export class FindOneProfileInput implements FindOneProfileDto {
  @Field(() => [WhereProfileInput], { nullable: true })
  where?: WhereProfileInput[];
  @Field(() => OrderByProfileInput, { nullable: true })
  order?: OrderByProfileInput;
}
