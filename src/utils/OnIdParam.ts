import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OneIdParam {
  // snippet 的 mongoose id
  @IsString()
  @ApiProperty({
    description: 'snippet 唯一 ID'
  })
  id: string;
}
