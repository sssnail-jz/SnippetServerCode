import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { CommentService } from './comment.service';
import { OneIdParam } from '../utils/OnIdParam';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentBody } from 'src/utils/CreateCommentBody';

@Controller('comment')
@ApiTags('comment')
export class CommentController {

  constructor(private readonly commentService: CommentService){}

  // 获取一篇 snippet 对应的评论，id 为 snippet id
  @Get(':id')
  async getCommentsById(@Param() param: OneIdParam, @Response() res){
    const result = await this.commentService.getCommentsById(param.id)
    res.json({
      data: result
    })
  }

  // 为一篇 snippet 创建评论， id 为 snippet id，body 里面为评论体
  @Post(':id')
  async createCommentForId(
    @Param() param: OneIdParam, 
    @Body() body: CreateCommentBody){
      return await this.commentService.createCommentForId(param.id, body)
  }
}
