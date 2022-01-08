import { IsNumberString } from 'class-validator';

export class OneIdParam {
  @IsNumberString()
  id: number;
}
