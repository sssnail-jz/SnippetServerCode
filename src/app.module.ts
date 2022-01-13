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
import { TestCookieController } from './testcookie/testcookie.controller';
import { TestsessionController } from './testsession/testsession.controller';
import { TestfileuploadController } from './testfileupload/testfileupload.controller';

// 导入写好的中间件类
import { InitMiddleware } from './middleware/InitMiddleware';
import { SnippetModule } from './snippet/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbConfiguration from './testconfig/db.configuration';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './testschedule/TaskModule';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/snippet', {
      useNewUrlParser: true,
    }),
    ConfigModule.forRoot({ load: [DbConfiguration] }),
    ScheduleModule.forRoot(),
    SnippetModule,
    TaskModule,
    AuthModule,
    UsersModule,
    CommentModule
  ],
  controllers: [
    AppController,
    TestCookieController,
    TestsessionController,
    TestfileuploadController
  ],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
