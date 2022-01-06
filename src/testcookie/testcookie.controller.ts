import { Controller, Get, Response, Request} from '@nestjs/common';

@Controller('snippettest')
export class TestCookieController {
  @Get('setcookie')
  setCookie(@Response() res){
    res.cookie("name",'zhangsan',{maxAge: 900000, httpOnly: true}); 
    res.json({mag: 'set cookie successful!'})
  }

  @Get('getcookie')
  getCookie(@Request() req){
    return req.cookies.name;
  }
}
