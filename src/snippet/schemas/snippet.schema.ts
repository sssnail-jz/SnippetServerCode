import * as mongoose from 'mongoose';
export const SnippetSchema = new mongoose.Schema({
  // snippet 标题
  title: {
    type: String,
    minlength:1,
    maxlength: 30,
    required: true,
  },

  // snippet 作者
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  // snippet 内容
  content:{
    type: String,
    required:true,
    minlength:1
  },

  // snippet 封面
  cover:{
    type:String,
    required:false
  },

  // snippet 发布/修改日期(由服务端 create 的时候产生)
  publishDate:{
    type: Date,
    required:true
  },
  
  // snippet tags 数组
  tags:{
    type: Array,
    required:true
  }
});
