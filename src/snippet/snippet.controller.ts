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
import { SnippetExceptionsFilter } from '../exceptionfilter/snippet.exception.filter';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';
import { Roles } from '../decorator/roles.decorator';
import { RolesGuard } from '../testguard/roles.gyard';
import { MongooseIdParam } from '../utils/MongooseIdParam';
import { CreateSnippetBody } from '../utils/CreateSnippetBody';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('snippet')
@ApiTags('snippet')
@UseFilters(SnippetExceptionsFilter)
// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth token'
// })
export class SnippetController {
  constructor(private snippetService: SnippetService) {}

  // 获取 snippet 列表
  @Get()
  async snippetList(@Response() res) {
    res.json({
      // data 是数组
      data: await this.snippetService.snippetList(),
    });
  }

  // 获取 snippet 详情
  @Get(':id')
  async snippetDetail(@Param() param: MongooseIdParam, @Response() res){
    res.json({
      // data 是对象
      data: await this.snippetService.snippetDetail(param.id),
    });
  }

  // 新建 snippet
  @Post()
  @UseGuards(RolesGuard) 
  @ApiResponse({
    status: 201,
    description: '创建 snippet 成功',
    type: SnippetExceptionSchema
  })
  @ApiResponse({
    status: 500,
    description: '服务内部创建数据异常',
    type: SnippetExceptionSchema
  })
  async snippetCreate(
    @Body() body: CreateSnippetBody,
  ): Promise<{ title: string; author: string }> {
    return await this.snippetService.snippetCreate(body);
  }

  // 修改 snippet
  @Put(':id')
  @ApiResponse({ status: 200, description: '修改 snippet 成功.' })
  @ApiResponse({ status: 520, description: 'mongoose exception.' })
  // @Roles('admin') // 测试守卫，这里手动添加 admin 权限
  // @UseGuards(RolesGuard)
  snippetPut(@Param() param: MongooseIdParam, @Body() body): string {
    return this.snippetService.snippetPut(param.id, body);
  }

  // 删除 snippet
  @Delete(':id')
  snippetDelete(@Param('id') id: string): string {
    return this.snippetService.snippetDelete(id);
  }
}
