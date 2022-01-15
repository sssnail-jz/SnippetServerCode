import { Body, Controller, Get, Param, Post, Request, Response, UseFilters, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MongooseIdParam } from '../utils/MongooseIdParam';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCommentBody } from 'src/utils/CreateCommentBody';
import { SnippetExceptionsFilter } from 'src/exceptionfilter/snippet.exception.filter';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from 'src/role/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('comment')
@ApiTags('comment')
@UseFilters(SnippetExceptionsFilter)

//// 认证
@UseGuards(AuthGuard('jwt')) 
@ApiResponse({
  status: 401,
  description: '认证失败',
  type: SnippetExceptionSchema
})
@ApiResponse({
  status: 500,
  description: '服务内部创建数据异常',
  type: SnippetExceptionSchema
})
@ApiHeader({
  name: 'Authorization',
  description: '认证token'
})
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
  
  //// 权限
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)  
  @ApiResponse({
    status: 521,
    description: '权限错误',
    type: SnippetExceptionSchema
  })
  async createComment(
    @Request() req,
    @Param() param: MongooseIdParam, 
    @Body() body: CreateCommentBody){
      return await this.commentService.createComment(req, param.id, body)
  }
}
