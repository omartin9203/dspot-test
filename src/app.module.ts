import { Module } from '@nestjs/common';
import { AppConfigModule } from './shared/modules/config/app-config.module';
import { GraphqlModule } from './shared/modules/graphql/graphql.module';
import { DataAccessModule } from './shared/modules/data-access/data-access.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [AppConfigModule, GraphqlModule, DataAccessModule, ProfileModule],
})
export class AppModule {}
