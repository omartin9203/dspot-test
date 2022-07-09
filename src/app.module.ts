import { Module } from "@nestjs/common";
import {AppConfigModule} from "./shared/modules/config/app-config.module";
import {GraphqlModule} from "./shared/modules/graphql/graphql.module";
import {DataAccessModule} from "./shared/modules/data-access/data-access.module";
import {NewsModule} from "./news/news.module";

@Module({
  imports: [
      AppConfigModule,
      GraphqlModule,
      DataAccessModule,
      NewsModule,
  ],
})
export class AppModule {}
