import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseException } from '../testcustomexception/mongoose.exception';
import { SnippetLogger } from '../testcustomlogger/snippetLogger';
import { Timeout } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SnippetService {
  private snippetLogger = new SnippetLogger(SnippetService.name);

  constructor(
    @InjectModel('Snippet') private readonly snippetModule,
    private readonly usersService: UsersService,
  ) {}

  async snippetList() {
    this.snippetLogger.log('Doing something...');
    this.snippetLogger.error('test error');
    return await this.snippetModule.find();
  }
  async snippetCreate(body) {
    return await this.snippetModule.create({
      title: 'test title',
      author: 'jack',
    });
  }
  snippetPut(id, body) {
    // test custom mongoose exception
    // throw new MongooseException()
    return 'modify snippet successful!';
  }
  snippetDelete(id) {
    return 'delete Snippet successful!';
  }

  /** 测试 populate 关联集合是否正常
   * 踩到的小坑：
   *  1，UsersService 要在这里使用的话必须在 UsersModule exports 数组里面导出
   *  然后 SnippetModule 的 inports 数组里面导入 UsersModule，然后在 SnippetService
   *  里面就可以 ‘引入’ UsersService 了
   *  2，关于 populate 报错 ‘schema 没有注册’ 的问题，因为 snippet.schema 里面 ref 的
   *  时候使用了 users，应该使用 User :(
   */
  // @Timeout(1000)
  // async testCreate(){
  //   await this.snippetModule.remove()
  //   this.snippetLogger.debug('删除 snippet 集合，创建测试数据...')
  //   var testUser = await this.usersService.testFindOneUser();
  //   await this.snippetModule.create({
  //     title:'jack',
  //     author: testUser._id
  //   })
  //   var populateResult = await this.snippetModule.findOne({title:'jack'}).populate('author');
  //   this.snippetLogger.debug(populateResult)
  // }
}
