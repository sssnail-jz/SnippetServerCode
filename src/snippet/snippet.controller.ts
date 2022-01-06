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
  UseFilters,
  UseGuards
  } from '@nestjs/common';
import { SnippetService } from './snippet.service';
import {MongooseExceptionFilter} from '../testexceptionfilter/mongooseexception.filter'
import {Roles} from '../decorator/roles.decorator'
import {RolesGuard} from '../testguard/roles.gyard'

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
  @UseGuards(RolesGuard)
  async snippetCreate(@Body() body, @Response() res){
    res.json({
      data: await this.snippetService.snippetCreate(body)
    }) 
  } 
  
  // 修改 snippet
  @Put(':id')
  @UseFilters(MongooseExceptionFilter)
  @Roles('admin') // 测试守卫，这里手动赋予 admin 权限
  @UseGuards(RolesGuard)
  snippetPut(@Param('id') id, @Body() body): string{
    return this.snippetService.snippetPut(id,body)
  }

  // 删除 snippet
  @Delete(':id')
  snippetDelete(@Param('id') id: string): string{
    return this.snippetService.snippetDelete(id)
  }
}
