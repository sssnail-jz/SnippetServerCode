import { HttpException, HttpStatus } from '@nestjs/common';

// 用户权限不足抛出
export class RolesForbiddenException extends HttpException {
  constructor() {
    super('roles forbidden exception', 521);
  }
}
