import { Controller, Get, Response, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('testcookie')
@ApiTags('snippettest')
export class TestCookieController {
  @Get('setcookie')
  setCookie(@Response() res) {
    res.cookie('name', 'zhangsan', { maxAge: 900000, httpOnly: true });
    res.json({ mag: 'set cookie successful!' });
  }

  @Get('getcookie')
  getCookie(@Request() req) {
    return req.cookies.name;
  }
}
