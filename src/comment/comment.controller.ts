import { Body, Controller, Get, Param, Post, Response, UseFilters } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MongooseIdParam } from '../utils/MongooseIdParam';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentBody } from 'src/utils/CreateCommentBody';
import { SnippetExceptionsFilter } from 'src/exceptionfilter/snippet.exception.filter';

@Controller('comment')
@ApiTags('comment')
@UseFilters(SnippetExceptionsFilter)
export class CommentController {

  constructor(private readonly commentService: CommentService){}

  /**
   * 获取一篇 snippet 对应的评论，id 为 snippet id
   * @param param id 为 snippet id
   * @param res 
   */
  @Get(':id')
  async getCommentsById(@Param() param: MongooseIdParam, @Response() res){
    const result = await this.commentService.getCommentsById(param.id)
    res.json({
      data: result
    })
  }

  /**
   * 为一篇 snippet 创建评论
   * @param param id 为 snippet id
   * @param body body 里面为评论体
   * @returns 
   */
  @Post(':id')
  async createComment(
    @Param() param: MongooseIdParam, 
    @Body() body: CreateCommentBody){
      return await this.commentService.createComment(param.id, body)
  }
}
