import * as mongoose from 'mongoose';
export const TagSchema = new mongoose.Schema({

  // tag name
  name:{
    type: String,
    required: true
  }
});
