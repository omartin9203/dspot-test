import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('GenerateProfilesDto')
export class GenerateProfilesResponse {
  @Field()
  generationCode: string;
  @Field()
  relationshipsGenerated: number;
}
