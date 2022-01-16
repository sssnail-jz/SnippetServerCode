import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseException } from '../customexception/mongoose.exception';
import { SnippetLogger } from '../testcustomlogger/snippetLogger';
import { Timeout } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';
import * as mongoose from 'mongoose';

@Injectable()
export class SnippetService {
  private snippetLogger = new SnippetLogger(SnippetService.name);

  constructor(
    @InjectModel('Snippet') private readonly snippetModule,
    private readonly usersService: UsersService,
  ) {}

  // 获取snippet列表
  async snippetList() {
    const result = await this.snippetModule.find().populate('author');
    return result
  }

  // 获取 snippet 详情
  async snippetDetail(id){
    const result = await this.snippetModule.findOne({_id: id}).populate('author')
    return result
  }

  // 创建 snippet
  async snippetCreate(req, body) {
    body.publishDate = Date.now()
    body.author = req.user._id
    return await this.snippetModule.create(body);
  }

  // 修改 一条 snippet
  snippetPut(id, body) {
    return 'modify snippet successful!';
  }

  // 删除一条 snippet
  snippetDelete(id) {
    return 'delete Snippet successful!';
  }
}
