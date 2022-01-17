import { Controller, Get, UseGuards, Post, Request, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { SnippetExceptionsFilter } from './exceptionfilter/snippet.exception.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SnippetExceptionSchema } from './exceptionfilter/snippet.exception.schema';
import { SnippetLogger } from './customlogger/SnippetLogger';

@Controller()
@ApiTags('door')
@UseFilters(SnippetExceptionsFilter)
export class AppController {
  private readonly snippetLogger = new SnippetLogger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @ApiResponse({
    status: 401,
    description: '认证失败',
    type: SnippetExceptionSchema
  })
  @Post('auth/login')
  async login(@Request() req) {
    this.snippetLogger.debug('[login] resuest.user ' + req.user)
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiResponse({
    status: 401,
    description: '认证失败',
    type: SnippetExceptionSchema
  })
  getProfile(@Request() req) {
    return req.user;
  }
}
