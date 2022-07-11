import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SuccessResponse {
  constructor() {
    this.success = true;
  }
  @Field(() => Boolean)
  success: boolean;
}
