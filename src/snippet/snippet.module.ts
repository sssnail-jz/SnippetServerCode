import { Module } from '@nestjs/common';
import {SnippetController} from './snippet.controller'
import {SnippetService} from './snippet.service'
import { SnippetSchema } from './schemas/article.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Snippet', schema: SnippetSchema,collection:"snippets" }]),
    ConfigModule
  ],
  controllers: [SnippetController],
  providers: [SnippetService],
  exports:[SnippetService]
}) 
export class SnippetModule {
  constructor(private configService: ConfigService) {
    // get a custom configuration value
    const dbHost = this.configService.get<string>('database.host', 'default');
    const dbPort = this.configService.get<Number>('database.port', 0);
    console.log('dbHost: ' + dbHost)
    console.log('dbPort: ' + dbPort)
  }
}
