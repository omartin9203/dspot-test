import { PaginatedFindProfileUseCaseDto } from '../../aplication/dto/paginated-find-profile-use-case.dto';
import { PageParamsInput } from '../../../shared/core/presentation/inputs/paginator-params.input';
import { ArgsType, Field } from '@nestjs/graphql';
import { WhereProfileInput } from './where-profile.input';
import { OrderByProfileInput } from './order-by-profile.input';

@ArgsType()
export class PaginatedFindProfileInput implements PaginatedFindProfileUseCaseDto {
  @Field(() => PageParamsInput)
  pageParams: PageParamsInput;
  @Field(() => [WhereProfileInput], { nullable: true })
  where?: [WhereProfileInput];
  @Field(() => OrderByProfileInput, { nullable: true })
  order?: OrderByProfileInput;
}
