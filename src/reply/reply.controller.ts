import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateReplyBody } from 'src/utils/CreateReplyBody';
import { MongooseIdParam } from 'src/utils/MongooseIdParam';
import { ReplyService } from './reply.service';

@Controller('reply')
@ApiTags('reply')
export class ReplyController {
  
  constructor(private readonly replyService: ReplyService){}

  /**
   * 通过评论的id获得这条评论对应的所有的回复
   * @param param 评论id
   * @param res 
   */
  @Get(':id')
  async getReplysById(
    @Param() param: MongooseIdParam,
    @Response() res){
      res.json({
        data: await this.replyService.getReplysById(param.id)
      })
  }

  /**
   * 创建回复
   * @param param id 为 评论的 id
   * @param body  回复体
   * @returns 
   */
  @Post(':id')
  async createReply(
    @Param() param: MongooseIdParam, 
    @Body() body: CreateReplyBody){
      return await this.replyService.createReply(param.id, body)
  }
}
