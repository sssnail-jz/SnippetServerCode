import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class SnippetLogger extends ConsoleLogger {
  customLog() {
    this.log('Please feed the cat!');
  }
}
