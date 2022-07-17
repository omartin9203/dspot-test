import { Field, ObjectType } from '@nestjs/graphql';
import { ProfileDto } from './profile.response';

@ObjectType('ShorterConnectionDto')
export class ShorterConnectionResponse {
  @Field()
  deepCount: number;
  @Field(() => [ProfileDto])
  friends: ProfileDto[];
}
