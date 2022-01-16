import { Body, Controller, Get, Post, Response, UseFilters, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SnippetExceptionsFilter } from 'src/exceptionfilter/snippet.exception.filter';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';
import { TagsService } from './tags.service';

@Controller('tags')
@ApiTags('tags')
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
export class TagsController {
  
  constructor(private readonly tagsService: TagsService){}

  @Get()
  async tagsList(@Response() res){
    res.json({
      data:await this.tagsService.tagsList() 
    })
  }

  // test
  // @Post()
  // async create(){
  //   await this.tagsService.create()
  //   return 'success'
  // }
}
