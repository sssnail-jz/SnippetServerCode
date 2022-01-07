import { Controller,Get,UsePipes,Query } from '@nestjs/common';
import {UserPipe} from '../user.pipe'
import {ApiTags} from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  @Get()
	@UsePipes(new UserPipe())
	pipe(@Query() info){
		console.log(info);
		return `this is Pipe`;
	}
}
