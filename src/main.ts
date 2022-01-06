import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源路径
  app.useStaticAssets('statics'); 
  // 配置 cookie
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
