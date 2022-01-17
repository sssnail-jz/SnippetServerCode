import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timeout } from '@nestjs/schedule';
import { SnippetLogger } from 'src/customlogger/SnippetLogger';

export type User = any;

@Injectable()
export class UsersService {
  private readonly snippetLogger = new SnippetLogger(UsersService.name);
  constructor(@InjectModel('User') private readonly userModule) {}

  async findUsers(){
    const result = await this.userModule.find()
    return result
  }

  async findOneByName(username) {
    const result = await this.userModule.findOne({name: username})
    return result
  }

  async findOneById(id) {
    const result = await this.userModule.findOne({_id: id})
    return result
  }
}
