import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('snippet')
export class SnippetController {
  // 获取 snippet 列表
  @Get('list')
  snippetList(){
    return "this is snippet list!"
  }
  
  // 新建 snippet
  @Post()
  snippetCreate(@Body() body){
    return "create successful!"
  } 
  
  // 修改 snippet
  @Put(':id')
  snippetPut(@Param('id') id, @Body() body): string{
    return "modify snippet successful!"
  }

  // 删除 snippet
  @Delete(':id')
  snippetDelete(@Param('id') id: string): string{
    return "delete Snippet successful!"
  }
}
