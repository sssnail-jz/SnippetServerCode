import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReplyService } from './reply.service';
import { ReplySchema } from './schemas/reply.shema';
import { ReplyController } from './reply.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Reply', schema: ReplySchema, collection: 'replys' },
    ])
  ],
  providers: [ReplyService],
  exports:[ReplyService],
  controllers: [ReplyController]
})
export class ReplyModule {}
