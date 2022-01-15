import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';

import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';

@Controller('upload')
@ApiTags('upload')
@UseInterceptors(FileInterceptor('file'))
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
export class UploadController {

  @Post()
  upload(@UploadedFile() file: Express.Multer.File, @Body() body:{uname: string}) {
    console.log(file);
    const writeImage = createWriteStream(
      join(__dirname, '..', '../statics/upload', `${body.uname}`),
    );
    writeImage.write(file.buffer);
    return 'success'
  }
}
