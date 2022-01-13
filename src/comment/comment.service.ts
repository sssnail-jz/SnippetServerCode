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
    // 从数据库中查找到此文章对应的所有评论
    const result = await this.commentModule.find({snippet: id}).populate('author')
    return result
  }

  async createCommentForId(id, body){
    this.snippetLogger.debug('[createCommentForId] Id checkout: ' + id)
    this.snippetLogger.debug('[createCommentForId] Body checkout: ' + JSON.stringify(body))
    var createBody = body
    // 将评论关联到文章
    createBody.snippet = new  mongoose.Types.ObjectId(id)
    // 将评论关联到用户
    createBody.author = new  mongoose.Types.ObjectId('61d94e20a502c2591edc53e9')
    createBody.createdDate = Date.now()
    return await this.commentModule.create(createBody)
  }
}
