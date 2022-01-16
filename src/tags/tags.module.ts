import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Tag', schema: TagSchema, collection: 'tags' },
    ]),
  ],
  controllers:[TagsController],
  providers: [TagsService],
  exports:[TagsService]
})
export class TagsModule {}
