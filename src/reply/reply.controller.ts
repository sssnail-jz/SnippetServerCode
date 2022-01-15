import { Body, Controller, Get, Param, Post, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/roles.decorator';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';
import { RolesGuard } from 'src/guard/roles.guard';
import { Role } from 'src/role/role.enum';
import { CreateReplyBody } from 'src/utils/CreateReplyBody';
import { MongooseIdParam } from 'src/utils/MongooseIdParam';
import { ReplyService } from './reply.service';

@Controller('reply')
@ApiTags('reply')

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

  //// 权限
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)  
  @ApiResponse({
    status: 521,
    description: '权限错误',
    type: SnippetExceptionSchema
  })
  async createReply(
    @Param() param: MongooseIdParam, 
    @Body() body: CreateReplyBody){
      return await this.replyService.createReply(param.id, body)
  }
}
