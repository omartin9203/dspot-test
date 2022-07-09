import { graphqlProvider } from './graphql.provider';
import { gqlPubSubProvider } from './gql-pubsub.provider';
import {Global, Module} from "@nestjs/common";

@Global()
@Module({
  imports: [graphqlProvider ],
  providers: [gqlPubSubProvider],
  exports: [graphqlProvider, gqlPubSubProvider],
})
export class GraphqlModule {}
