import { IsString, IsNumber, IsBase64, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadBody {
  @IsString()
  @ApiProperty({
    description: 'uid - 文件名',
    default: '777-3.jpg'
  })
  uname: string;
}
