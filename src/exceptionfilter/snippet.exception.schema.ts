/**
 * 该文件定义了 snippet 服务经过异常过滤器之后的异常的结构说明
 */
import { IsString, IsNumber, IsBase64, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SnippetExceptionSchema{

  @IsNumber()
  @ApiProperty({
    description: '异常码'
  })
  statusCode: number;

  @IsString()
  @ApiProperty({
    description: '时间戳'
  })
  timestamp: string;

  @IsString()
  @ApiProperty({
    description: '发生异常的路径'
  })
  path: string;

  @IsString()
  @ApiProperty({
    description: '发生异常的原因'
  })
  msg: string;
}