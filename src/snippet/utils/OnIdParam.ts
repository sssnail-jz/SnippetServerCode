import { IsString } from 'class-validator';

export class OneIdParam {
  // snippet 的 mongoose id
  @IsString()
  id: string;
}
