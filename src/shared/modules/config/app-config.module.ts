import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppConfigService } from './service/app-config-service';
import { appConfig, appSchema } from './namespaces/app.config';
import { databaseSchema, databaseConfig } from './namespaces/database.config';
import { graphqlConfig, graphqlSchema } from './namespaces/graphql.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        databaseConfig,
        graphqlConfig,
      ],
      validationSchema: Joi.object({
        ...appSchema,
        ...databaseSchema,
        ...graphqlSchema,
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
