import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // 小笔记：
  // auth/login 使用了 local 守卫，进行匹配，如果匹配成功，
  // 此函数将用户信息追加到 request.user，然后 auth/login 函数内部调用
  //  jwt 生成 token ，部署 jwt 策略，之后 jwt 会进入 jwt 的 validate 函数.
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
