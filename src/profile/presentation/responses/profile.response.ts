import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProfileDto {
  @Field(() => ID)
  id: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;

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
  @Field(() => [ID])
  friendsIds: string[];
  @Field(() => [ProfileDto], { nullable: true })
  friends?: ProfileDto[];
  @Field({ nullable: true })
  generationCode?: string;
  @Field({ nullable: true })
  generationNumber?: number;
}
