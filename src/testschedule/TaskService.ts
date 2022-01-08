import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { SnippetLogger } from 'src/testcustomlogger/snippetLogger';

@Injectable()
export class TaskService {
  private readonly logger = new SnippetLogger(TaskService.name);

  // @Cron(new Date(Date.now()+10*1000))
  // handleCron() {
  //   this.logger.debug('run in app staret 10 seconds later.');
  // }

  // @Interval(5000)
  // handleInterval() {
  //   this.logger.debug('Called every 5 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
