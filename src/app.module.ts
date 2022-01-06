import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { TestCookieController } from './testcookie/testcookie.controller';
import { TestsessionController } from './testsession/testsession.controller';
import { TestfileuploadController } from './testfileupload/testfileupload.controller';

// 导入写好的中间件类
import {InitMiddleware} from './middleware/InitMiddleware'

@Module({
  imports: [],
  controllers: [AppController, SnippetController, TestCookieController, TestsessionController, TestfileuploadController],
  providers: [AppService, SnippetService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
		consumer
		.apply(InitMiddleware)
		.forRoutes({ path: '*', method: RequestMethod.ALL })
	}
}
