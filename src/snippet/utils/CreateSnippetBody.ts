import { IsString, IsNumber, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * CreateSnippetBody 会被 new snippet、update snippet 接口共用，
 * 后者会利用 nestjs 的类型映射选择 CreateSnippetBody 的某些成员组成新类型
 */
export class CreateSnippetBody {
  // 标题
  @IsString()
  @ApiProperty({
    description: 'The title of new snippet',
    minLength: 1,
    maxLength: 30,
    default: 'test title',
  })
  title: string;

  // 作者
  @IsString()
  @ApiProperty()
  author: string;

  // 发布日期（时间戳）
  @IsNumber()
  @ApiProperty()
  publishDate: number;

  // 内容
  @IsString()
  @ApiProperty()
  content: string;

  // 封面
  // @IsBase64()
  // cover: BinaryType
}
