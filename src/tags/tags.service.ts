import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel('Tag') private readonly tagModule
  ){}

  async tagsList(){
    const result = await this.tagModule.find()
    return result 
  }

  // async create(){
  //   await this.tagModule.create({name: 'Linux'})
  // }
}
