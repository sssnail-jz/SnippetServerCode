import { IsString, IsNumber, IsBase64, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * CreateSnippetBody 会被 new snippet、update snippet 接口共用，
 * 后者会利用 nestjs 的类型映射选择 CreateSnippetBody 的某些成员组成新类型
 */
/**
 * 用户：客户端传递 token ，服务端通过 token 查到此用户的 objectId，然后动态赋值
 * 到 author 字段
 */
export class CreateSnippetBody {
  // 标题
  @IsString()
  @ApiProperty({
    description: 'The title of new snippet',
    minLength: 1,
    maxLength: 30,
    default: 'default title',
  })
  title: string;

  // 内容
  @IsString()
  @ApiProperty({
    description: 'snippet 内容',
    minLength: 1,
    default: 'default content'
  })
  content: string;

  // 封面(目前先是 string)
  @IsString()
  @ApiProperty({
    description: 'cover 路径， uid+filename'
  })
  cover: string

  // 标签
  @IsArray()
  @ApiProperty({
    default:['default tags1', 'default tags2']
  })
  tags:[]
}
