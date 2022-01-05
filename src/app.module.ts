import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnippetController } from './snippet/snippet.controller';

@Module({
  imports: [],
  controllers: [AppController, SnippetController],
  providers: [AppService],
})
export class AppModule {}
