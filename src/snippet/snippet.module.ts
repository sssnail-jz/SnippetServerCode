import { Module } from '@nestjs/common';
import {SnippetController} from './snippet.controller'
import {SnippetService} from './snippet.service'
import { SnippetSchema } from './schemas/article.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: 'Snippet', schema: SnippetSchema,collection:"snippets" }])],
  controllers: [SnippetController],
  providers: [SnippetService],
  exports:[SnippetService]
}) 
export class SnippetModule {}
