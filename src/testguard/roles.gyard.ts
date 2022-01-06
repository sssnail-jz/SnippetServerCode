import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {RolesForbiddenException} from '../testcustomexception/rolesborbidden.exception'
// 这个守卫用来守卫 roles
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // 这里为了测试，简单地让用户通过 query 参数具备 admin 权限
    /*
      消息中间件判断 token，如果具备管理员权限，设置 request.user = admin，
      然后 snippet 里面的 put 方法需要（至少） admin 权限
    */
    console.log(request.query.role)
    console.log(roles)
    if(request.query.role === roles[0] ){
      return true
    }else{
      throw new RolesForbiddenException()
    }
  }
}
