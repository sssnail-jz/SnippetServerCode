// 记录第一个踩的 nestjs 的坑 [https://stackoverflow.com/questions/56870498/nest-cant-resolve-dependencies-of-the-itemsservice-please-make-sure-that-t]
// 是说注入之后不用再在 app.module 里面的 controllers 和 providers 里面包含了
import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadController } from './upload/upload.controller';

import { InitMiddleware } from './middleware/InitMiddleware';
import { SnippetModule } from './snippet/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './schedule/TaskModule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';
import { TagsModule } from './tags/tags.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/snippet', {
      useNewUrlParser: true,
    }),
    ConfigModule.forRoot({isGlobal: true}),
    ScheduleModule.forRoot(),
    SnippetModule,
    TaskModule,
    AuthModule,
    UsersModule,
    CommentModule,
    ReplyModule,
    TagsModule,
    ConfigurationModule,
    UploadModule
  ],
  controllers: [
    AppController,
    UploadController
  ],
  providers: [AppService, UploadService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
