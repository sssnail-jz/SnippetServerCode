import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SnippetLogger } from 'src/testcustomlogger/snippetLogger';
import { ReplyService } from 'src/reply/reply.service';
import * as mongoose from 'mongoose';

@Injectable()
export class CommentService {
  private snippetLogger = new SnippetLogger(CommentService.name);

  constructor(
    @InjectModel('Comment') private readonly commentModule,
    // 引用 reply 服务
    private readonly replyService: ReplyService
    ){}

  async getCommentsById(id){
    // this.snippetLogger.debug('[getCommentsById] Id checkout: ' + id)
    // 从数据库中查找到此文章对应的所有评论
    const result = await this.commentModule.find({snippet: id}).populate('author')
    /**
     * 此处踩的坑不可谓不大，foreach 里面不支持 promise，
     * element in 的 for 循环好像也很水
     */
    var arr = []
    for(var i = 0; i < result.length; i++){
      const replys = await this.replyService.getReplysById(result[i]._id)
      result[i].replys = replys
      arr.push(result[i])
    }
    return arr
  }

  async createComment(id, body){
    this.snippetLogger.debug('[createComment] Id checkout: ' + id)
    this.snippetLogger.debug('[createComment] Body checkout: ' + JSON.stringify(body))
    var createBody = body
    // 将评论关联到文章
    createBody.snippet = new  mongoose.Types.ObjectId(id)
    // 将评论关联到用户
    createBody.author = new  mongoose.Types.ObjectId('61d94e20a502c2591edc53e9')
    createBody.createdDate = Date.now()
    createBody.replys = []
    return await this.commentModule.create(createBody)
  }
}
