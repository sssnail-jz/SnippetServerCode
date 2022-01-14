import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
  // 用户名
  name: {
    type: String,
    minlength: 1,
    maxlength: 15,
    required: true,
    unique: true
  },

  // 邮箱
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // 密码
  password: {
    type: String,
    required: true,
  },
});
