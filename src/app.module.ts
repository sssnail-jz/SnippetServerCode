import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';
import { SnippetService } from './snippet/snippet.service';
import { SnippettestController } from './snippettest/snippettest.controller';

@Module({
  imports: [],
  controllers: [AppController, SnippetController, SnippettestController],
  providers: [AppService, SnippetService],
})
export class AppModule {}
