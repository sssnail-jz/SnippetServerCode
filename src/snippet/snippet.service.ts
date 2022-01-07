import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {MongooseException} from '../testcustomexception/mongoose.exception'
import {SnippetLogger} from '../testcustomlogger/snippetLogger'

@Injectable()
export class SnippetService {
  private snippetLogger = new SnippetLogger(SnippetService.name)

  constructor(@InjectModel('Snippet') private readonly snippetModule){}

  async snippetList(){
    this.snippetLogger.log('Doing something...');
    this.snippetLogger.error('test error')
    return await this.snippetModule.find()
  }
  async snippetCreate(body){
    return await this.snippetModule.create({title:'test title', author: 'jack'})
  }
  snippetPut(id, body){
    // test custom mongoose exception
    // throw new MongooseException()
    return "modify snippet successful!"
  }
  snippetDelete(id){
    return "delete Snippet successful!"
  }
}
