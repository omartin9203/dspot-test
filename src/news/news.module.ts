import {HttpModule, HttpService, Module} from "@nestjs/common";
import {GraphqlModule} from "../shared/modules/graphql/graphql.module";
import {AppConfigModule} from "../shared/modules/config/app-config.module";
import {DataAccessModule} from "../shared/modules/data-access/data-access.module";
import {CqrsModule} from "@nestjs/cqrs";
import {ScheduleModule} from "@nestjs/schedule";
import {MongooseModule} from "@nestjs/mongoose";
import {NewsFeature} from "./infrastructure/entities/news.entity";
import {SyncNewsServices} from "./presentation/services/sync-news.services";
import {NewsResolver} from "./presentation/resolvers/news.resolver";
import {DisableNewsUseCase} from "./aplication/use-cases/disable-news/disable-news.use-case";
import {SyncNewsUseCase} from "./aplication/use-cases/sync-news/sync-news.use-case";
import {PaginatedFindNewsUseCase} from "./aplication/use-cases/paginated-find-news/paginated-find-news.use-case";
import {MongooseUnitOfWorkFactory} from "../shared/modules/data-access/mongoose/unitwork.mongoose.factory";
import {NewsRepository} from "./infrastructure/repositories/news.repository";
import {NewsRepositoryFactory} from "./infrastructure/repositories/news.repository.factory";
import {HnNewsClient} from "./infrastructure/services/hn-news.client";
import {NewsCommandsHandlers} from "./aplication/commands";
import {NewsQueryHandlers} from "./aplication/queries";

@Module({
  imports: [
    GraphqlModule,
    AppConfigModule,
    DataAccessModule,
    CqrsModule,
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      NewsFeature,
    ])
  ],
  providers: [
    // SyncNewsServices,
    NewsResolver,
    DisableNewsUseCase,
    SyncNewsUseCase,

    PaginatedFindNewsUseCase,
    {
      provide: 'IUnitOfWorkFactory',
      useClass: MongooseUnitOfWorkFactory,
    },
    {
      provide: 'INewsRepository',
      useClass: NewsRepository,
    },
    {
      provide: 'INewsRepositoryFactory',
      useClass: NewsRepositoryFactory,
    },
    {
      inject: [HttpService],
      provide: 'IHnNewsClient',
      useClass: HnNewsClient,
    },
    ...NewsCommandsHandlers,
    ...NewsQueryHandlers,
  ],
  exports: [

  ]
})
export class NewsModule {

}