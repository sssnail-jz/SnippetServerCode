import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SnippetService {
  constructor(
    @InjectModel('Snippet') private readonly snippetModule){}
  async snippetList(){
    return await this.snippetModule.find()
  }
  async snippetCreate(body){
    return await this.snippetModule.create({title:'test title', author: 'jack'})
  }
  snippetPut(id, body){
    return "modify snippet successful!"
  }
  snippetDelete(id){
    return "delete Snippet successful!"
  }
}
