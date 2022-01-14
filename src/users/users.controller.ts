import { Controller, Get, UseFilters, Response } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SnippetExceptionsFilter } from 'src/exceptionfilter/snippet.exception.filter';

@Controller('users')
@ApiTags('users')
@UseFilters(SnippetExceptionsFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService){}

  /**
   * 获取用户列表
   * @param res 
   */
  @Get()
  async findUsers(@Response() res){
    res.json({
      data: await this.usersService.findUsers()
    })
    }
  }
