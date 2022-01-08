import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('UserPipe value: ');
    console.log(value);
    value.age = 100;
    return value;
  }
}
