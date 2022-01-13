import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema } from './schemas/comment.schema';
import { ReplyModule } from 'src/reply/reply.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema, collection: 'comments' },
    ]),
    ReplyModule
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports:[CommentService]
})
export class CommentModule {

}
