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
    return result
  }

  async createReply(req, id, body){
    var createBody = body
    // 将回复关联到评论
    createBody.comment = new  mongoose.Types.ObjectId(id)
    // 将回复关联到用户
    createBody.author = req.user._id
    createBody.createdDate = Date.now()
    return await this.replyModule.create(createBody)
  }
}
