import { HttpException, HttpStatus } from '@nestjs/common';

// 这个自定义异常类里面的 statusCode 使用 520，之后可以累加
export class MongooseException extends HttpException {
  constructor() {
    super('mongoose exception', 520);
  }
}
