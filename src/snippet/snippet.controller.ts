import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Response, 
  Request,
  UseFilters
  } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import {MongooseExceptionFilter} from '../testexceptionfilter/mongooseexception.filter'

@Controller('snippet')
export class SnippetController {
  constructor(private snippetService:SnippetService){}

  // 获取 snippet 列表
  @Get()
  async snippetList(@Request() req, @Response() res){
    res.json({
      data: await this.snippetService.snippetList()
    })
  }
  
  // 新建 snippet
  @Post()
  async snippetCreate(@Body() body, @Response() res){
    res.json({
      data: await this.snippetService.snippetCreate(body)
    }) 
  } 
  
  // 修改 snippet
  @Put(':id')
  @UseFilters(MongooseExceptionFilter)
  snippetPut(@Param('id') id, @Body() body): string{
    return this.snippetService.snippetPut(id,body)
  }

  // 删除 snippet
  @Delete(':id')
  snippetDelete(@Param('id') id: string): string{
    return this.snippetService.snippetDelete(id)
  }
}
