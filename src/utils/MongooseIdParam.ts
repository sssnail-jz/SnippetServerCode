import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MongooseIdParam {
  // snippet 的 mongoose id
  @IsString()
  @ApiProperty({
    description: 'mongoose 唯一 ID'
  })
  id: string;
}
