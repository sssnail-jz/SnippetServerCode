import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  Render,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { createWriteStream } from 'fs';

import { ApiTags } from '@nestjs/swagger';

@Controller('testfileupload')
@ApiTags('snippettest')
@UseInterceptors(FileInterceptor('pic'))
export class TestfileuploadController {
  // 发送文件上传表单 html
  @Get()
  @Render('fileupload')
  index() {
    console.log('eslint');
  }

  // 实现文件上传
  @Post('upload')
  upload(@UploadedFile() file, @Request() req, @Response() res, @Body() body) {
    console.log(body);
    console.log(file);
    console.log(__dirname);
    const writeImage = createWriteStream(
      join(__dirname, '..', '../public/upload', `${file.originalname}`),
    );
    writeImage.write(file.buffer);
    res.json({ msg: 'upload file successful!' });
  }
}
