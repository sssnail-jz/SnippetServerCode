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
    return this.users.find(user => user.username === username);
  }

  // 测试，程序启动创建测试的用户信息到 mongoose
  // @Timeout(1000)
  // async testCreate(){
  //   await this.userModule.remove()
  //   this.snippetLogger.debug('删除 users 集合，并创建三条测试数据...')
  //   await this.userModule.create({name:'jack', email: '1051975984@qq.com', password: '123'})
  //   await this.userModule.create({name:'jack2', email: '1051975985@qq.com', password: '123'})
  //   await this.userModule.create({name:'jac3k', email: '1051975986@qq.com', password: '123'})
  // }

  async testFindOneUser(){
    return await this.userModule.findOne({name: 'jack2'})
  }
}
