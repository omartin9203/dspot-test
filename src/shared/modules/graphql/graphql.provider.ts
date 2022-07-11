import {GraphQLModule} from "@nestjs/graphql";
import { AppConfigService } from '../config/service/app-config-service';

export const graphqlProvider = GraphQLModule.forRootAsync({
  inject: [AppConfigService],
  async useFactory(config: AppConfigService) {
    return {
      autoSchemaFile: config.graphql.schema,
      installSubscriptionHandlers: true,
      playground: true, //config.app.nodeEnv !== NodeEnv.PRODUCTION,
      debug: true, //config.app.nodeEnv !== NodeEnv.PRODUCTION,
      introspection: true, //config.app.nodeEnv !== NodeEnv.PRODUCTION,
      cors: config.app.cors,
      fieldResolverEnhancers: ['guards', 'interceptors', 'filters'],
      // validationRules: [depthLimit(config.graphql.depthLimit)],
      context: ({
        req,
        connection,
      }: {
        req: Request;
        connection: any;
      }): { req: Request } => {
        // Return connection context when is a Subscription
        return connection ? { req: connection.context } : { req };
      },
      subscriptions: {
        onConnect: connectionParams => {
          return { connectionParams };
        },
      },
      uploads: {
        maxFileSize: config.graphql.maxFileSize,
        maxFiles: config.graphql.maxFiles,
      },
    };
  },
});
