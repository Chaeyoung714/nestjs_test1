import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config'; //설정파일

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const port = 3000;
  const serverConfig = config.get('server');
  const port = serverConfig.port;

  await app.listen(port);

  //log
  Logger.log(`Application running on port ${port}`);
}
bootstrap();
