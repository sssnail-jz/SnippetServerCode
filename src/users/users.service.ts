import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';
import { SnippetLogger } from 'src/testcustomlogger/snippetLogger';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[];
  private readonly snippetLogger = new SnippetLogger(UsersService.name);

  constructor(@InjectModel('User') private readonly userModule) {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
