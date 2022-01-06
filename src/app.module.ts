// 记录第一个踩的 nestjs 的坑 [https://stackoverflow.com/questions/56870498/nest-cant-resolve-dependencies-of-the-itemsservice-please-make-sure-that-t]
// 是说注入之后不用再在 app.module 里面的 controllers 和 providers 里面包含了
import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestCookieController } from './testcookie/testcookie.controller';
import { TestsessionController } from './testsession/testsession.controller';
import { TestfileuploadController } from './testfileupload/testfileupload.controller';

// 导入写好的中间件类
import {InitMiddleware} from './middleware/InitMiddleware'
import { UserController } from './user/user.controller';
import { SnippetModule } from './snippet/snippet.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/snippet',{ useNewUrlParser: true }),
    SnippetModule
  ],
  controllers: [AppController, TestCookieController, TestsessionController, TestfileuploadController, UserController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(InitMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
