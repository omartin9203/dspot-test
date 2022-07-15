import { Field, ID, InputType } from '@nestjs/graphql';
import { CreateProfileDto } from '../../aplication/dto/create-profile.dto';

@InputType()
export class CreateProfileInput implements CreateProfileDto {
  @Field()
  first_name: string;
  @Field()
  last_name: string;
  @Field({ nullable: true })
  phone?: string;
  @Field({ nullable: true })
  img?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  city?: string;
  @Field({ nullable: true })
  state?: string;
  @Field({ nullable: true })
  zipcode?: string;
  @Field()
  available: boolean;
  @Field(() => [ID], { nullable: true })
  friendsIds?: string[];
}
