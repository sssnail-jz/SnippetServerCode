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
import { RolesGuard } from '../guard/roles.guard';
import { MongooseIdParam } from '../utils/MongooseIdParam';
import { CreateSnippetBody } from '../utils/CreateSnippetBody';
import { ApiTags, ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Role } from 'src/role/role.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('snippet')
@ApiTags('snippet')
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

  //// 权限
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)  
  @ApiResponse({
    status: 521,
    description: '权限错误',
    type: SnippetExceptionSchema
  })
  async snippetCreate(@Body() body: CreateSnippetBody, @Request() req){
    return await this.snippetService.snippetCreate(req, body);
  }

  // 修改 snippet
  @Put(':id')

  //// 权限
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)  
  @ApiResponse({
    status: 521,
    description: '权限错误',
    type: SnippetExceptionSchema
  })
  snippetPut(@Param() param: MongooseIdParam, @Body() body): string {
    return this.snippetService.snippetPut(param.id, body);
  }

  // 删除 snippet
  @Delete(':id')

  //// 权限
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)  
  @ApiResponse({
    status: 521,
    description: '权限错误',
    type: SnippetExceptionSchema
  })
  snippetDelete(@Param('id') id: string): string {
    return this.snippetService.snippetDelete(id);
  }
}
