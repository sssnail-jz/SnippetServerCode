import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetLogger } from 'src/testcustomlogger/snippetLogger';
import * as mongoose from 'mongoose';

@Injectable()
export class ReplyService {
  private snippetLogger = new SnippetLogger(ReplyService.name);
  constructor(@InjectModel('Reply') private readonly replyModule){}

  async getReplysById(commentId: string){
    const result = await this.replyModule.find({comment: commentId}).populate('author')
    // this.snippetLogger.debug( '[getReplysById] result ' + result)
    return result
  }

  async createReply(id, body){
    // this.snippetLogger.debug('[createReply] Id checkout: ' + id)
    // this.snippetLogger.debug('[createReply] Body checkout: ' + JSON.stringify(body))
    var createBody = body
    // 将回复关联到评论
    createBody.comment = new  mongoose.Types.ObjectId(id)
    // 将回复关联到用户
    createBody.author = new  mongoose.Types.ObjectId('61d94e20a502c2591edc53eb')
    createBody.createdDate = Date.now()
    return await this.replyModule.create(createBody)
  }
}
