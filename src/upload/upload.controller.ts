import { Controller, Post, Body, UseInterceptors, UploadedFile, UseGuards} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SnippetExceptionSchema } from 'src/exceptionfilter/snippet.exception.schema';
import { UploadBody } from 'src/entities/upload.body';
import { UploadService } from './upload.service';

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

  constructor(private readonly uploadService: UploadService){}

  /**
   * 封面上传
   * @param file 
   * @param body 
   * @returns 
   */
  @Post('cover')
  cover(
    @UploadedFile() file: Express.Multer.File, 
    @Body() body: UploadBody) {
    return this.uploadService.cover(file, body) ? 'success' : 'error';
  }
}
