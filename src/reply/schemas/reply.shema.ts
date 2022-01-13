import * as mongoose from 'mongoose';
export const ReplySchema = new mongoose.Schema({

  // reply 关联的 comment
  comment:{
    type: mongoose.Types.ObjectId,
    ref: 'Comment',
    required: true,
  },

  // reply 关联的用户
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // reply 内容
  content:{
    type: String,
    required:true,
    minlength:1
  },

  // reply 发布日期(由服务端 create 的时候产生)
  createdDate:{
    type: Date,
    required:true
  }
});
