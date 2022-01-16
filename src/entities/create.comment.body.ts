import { IsString, IsNumber, IsBase64, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentBody {
  // 内容
  @IsString()
  @ApiProperty({
    description: 'comment 内容',
    minLength: 1,
    default: 'default content'
  })
  content: string;
}
