import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetLogger } from 'src/testcustomlogger/snippetLogger';
import * as mongoose from 'mongoose';

@Injectable()
export class CommentService {
  private snippetLogger = new SnippetLogger(CommentService.name);

  constructor(@InjectModel('Comment') private readonly commentModule){}

  async getCommentsById(id){
    this.snippetLogger.debug('[getCommentsById] Id checkout: ' + id)
    return await this.commentModule.find({_id: id})
  }

  async createCommentForId(id, body){
    this.snippetLogger.debug('[createCommentForId] Id checkout: ' + id)
    this.snippetLogger.debug('[createCommentForId] Body checkout: ' + JSON.stringify(body))
    var createBody = body
    createBody.snippet = new  mongoose.Types.ObjectId(id)
    createBody.author = new  mongoose.Types.ObjectId()
    createBody.createdDate = Date.now()
    return await this.commentModule.create(createBody)
  }
}
