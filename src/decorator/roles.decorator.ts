import { SetMetadata } from '@nestjs/common';

// 此装饰器用来设置 roles
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
