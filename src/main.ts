import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AppConfigService } from './shared/modules/config/service/app-config-service';
import { AppConfigModule } from './shared/modules/config/app-config.module';

async function bootstrap(): Promise<void> {
  const auxApp = await NestFactory.createApplicationContext(AppConfigModule);
  const logLevel = auxApp.get(AppConfigService).app.logLevel;
  const port = auxApp.get(AppConfigService).app.port;
  await auxApp.close();

  const app = await NestFactory.create(AppModule, {
    logger: logLevel,
  });

  const configService: AppConfigService = app.get(AppConfigService);
  app.useGlobalPipes();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port);
  Logger.log(
    `🚀 Server running on port :${configService.app.port}`,
    'NestApplication',
  );
}

bootstrap();
