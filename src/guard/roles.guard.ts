import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesForbiddenException } from 'src/customexception/rolesborbidden.exception';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { Role } from 'src/role/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    var user = {roles: ['aa']}
    console.log(requiredRoles)
    console.log(user.roles)
    if(!requiredRoles.some((role) => user.roles?.includes(role))){
      throw new RolesForbiddenException()  
    }else{
      return true
    }
  }
}
