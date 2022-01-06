import * as mongoose from 'mongoose';
export const SnippetSchema = new mongoose.Schema({
  title: {
    type:String,
    required:true
  },
  author: {
    type:String,
    required:true
  }
});