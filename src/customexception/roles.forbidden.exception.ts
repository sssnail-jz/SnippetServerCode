import { HttpException, HttpStatus } from '@nestjs/common';

// 用户权限异常
export class RolesForbiddenException extends HttpException {
  constructor() {
    super('权限错误', 521);
  }
}
