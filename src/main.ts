import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';
import {SnippetLogger} from './testcustomlogger/snippetLogger'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,
    {
      bufferLogs: true
    }
    );

  // 配置 logger（全局的 logger 为 snippetlogger） 
  app.useLogger(new SnippetLogger());

  // 配置静态资源路径
  app.useStaticAssets('statics'); 

  // 配置模板引擎
  app.setBaseViewsDir(join(__dirname, '..', 'views')) // 放视图的文件
  app.setViewEngine('ejs');

  // 配置 cookie
  app.use(cookieParser());

  // 配置 session
  app.use(session({
    secret: '12345',
    name: 'session',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
  }));
  
  // 配置验证管道和转化
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true, // 启用白名单
    forbidNonWhitelisted: true // 出现不在白名单中的属性会报错
  }));

  // 配置 swagger
  const options = new DocumentBuilder()
  .setTitle('Snippet')
  .setDescription('The Snippet API description')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
