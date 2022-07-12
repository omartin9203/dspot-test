import { HttpModule, Module } from '@nestjs/common';
import { GraphqlModule } from '../shared/modules/graphql/graphql.module';
import { AppConfigModule } from '../shared/modules/config/app-config.module';
import { DataAccessModule } from '../shared/modules/data-access/data-access.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileFeature } from './infrastructure/entities/profile.entity';
import { MongooseUnitOfWorkFactory } from '../shared/modules/data-access/mongoose/unitwork.mongoose.factory';
import { ProfileRepository } from './infrastructure/repositories/profile.repository';
import { ProfileRepositoryFactory } from './infrastructure/repositories/profile.repository.factory';
import { ProfileCommandsHandlers } from './aplication/commands';
import { ProfileQueryHandlers } from './aplication/queries';
import { ProfileUseCases } from './aplication/use-cases';
import { ProfileResolvers } from './presentation/resolvers';
import { ProfileServices } from './presentation/services';
import { ProfileEventsHandlers } from './presentation/subscribers';
import { ProfileControllers } from './presentation/controllers';

@Module({
  imports: [
    GraphqlModule,
    AppConfigModule,
    DataAccessModule,
    CqrsModule,
    HttpModule,
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([ProfileFeature]),
  ],
  controllers: [...ProfileControllers],
  providers: [
    {
      provide: 'IUnitOfWorkFactory',
      useClass: MongooseUnitOfWorkFactory,
    },
    {
      provide: 'IProfileRepository',
      useClass: ProfileRepository,
    },
    {
      provide: 'IProfileRepositoryFactory',
      useClass: ProfileRepositoryFactory,
    },
    ...ProfileServices,
    ...ProfileResolvers,
    ...ProfileUseCases,
    ...ProfileCommandsHandlers,
    ...ProfileQueryHandlers,
    ...ProfileEventsHandlers,
  ],
  exports: [],
})
export class ProfileModule {}
