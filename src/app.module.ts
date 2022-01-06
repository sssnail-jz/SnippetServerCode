import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { TestCookieController } from './testcookie/testcookie.controller';
import { TestsessionController } from './testsession/testsession.controller';

@Module({
  imports: [],
  controllers: [AppController, SnippetController, TestCookieController, TestsessionController],
  providers: [AppService, SnippetService],
})
export class AppModule {}
