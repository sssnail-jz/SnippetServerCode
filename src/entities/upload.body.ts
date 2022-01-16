import { IsString, IsNumber, IsBase64, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadBody {
  // 内容
  @IsString()
  @ApiProperty({
    description: 'uid - 文件名',
    default: '777-3.jpg'
  })
  uname: string;

    // 内容
    @IsString()
    @ApiProperty({
      description: '文件上传目录',
      default: 'cover'
    })
    dir: string;
}
