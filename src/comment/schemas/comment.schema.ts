import * as mongoose from 'mongoose';
export const CommentSchema = new mongoose.Schema({

  // comment 关联的 snippet
  snippet:{
    type: mongoose.Types.ObjectId,
    ref: 'Snippet',
    required: true,
  },

  // comment 作者
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // comment 内容
  content:{
    type: String,
    required:true,
    minlength:1
  },

  // comment 发布日期(由服务端 create 的时候产生)
  createdDate:{
    type: Date,
    required:true
  }
});
