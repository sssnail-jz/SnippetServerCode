import { Body, Controller, Delete, Get, Param, Post, Put, Response, Request } from '@nestjs/common';
import { SnippetService } from './snippet.service';

@Controller('snippet')
export class SnippetController {
  constructor(private snippetService:SnippetService){}

  // 获取 snippet 列表
  @Get()
  snippetList(@Request() req, @Response() res){
    
    res.json({
      cookietest: req.cookies.name,
      data: this.snippetService.snippetList()
    })
  }
  
  // 新建 snippet
  @Post()
  snippetCreate(@Body() body){
    return this.snippetService.snippetCreate(body)
  } 
  
  // 修改 snippet
  @Put(':id')
  snippetPut(@Param('id') id, @Body() body): string{
    return this.snippetService.snippetPut(id,body)
  }

  // 删除 snippet
  @Delete(':id')
  snippetDelete(@Param('id') id: string): string{
    return this.snippetService.snippetDelete(id)
  }
}
