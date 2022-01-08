import { Controller, Get, Request, Response } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

@Controller('testsession')
@ApiTags('snippettest')
export class TestsessionController {
  @Get('setsession')
  setSession(@Request() req, @Response() res) {
    req.session.name = 'jack';
    res.json({ msg: 'setsession successful!' });
  }

  @Get('getsession')
  getSession(@Request() req, @Response() res) {
    res.json({
      sessiontest: req.session.name,
    });
  }
}
