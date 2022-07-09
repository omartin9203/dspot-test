import { AppConfigModule } from '../../config/app-config.module';
import { AppConfigService } from '../../config/service/app-config-service';
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {Logger} from "@nestjs/common";

export const mongooseProvider = MongooseModule.forRootAsync({
  imports: [AppConfigModule],
  inject: [AppConfigService],
  useFactory: (config: AppConfigService): (MongooseModuleOptions | Promise<MongooseModuleOptions>) => {
    Logger.debug(config.database.connectString);

    return {
      uri: config.database.connectString,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } as MongooseModuleOptions;
  },
});
