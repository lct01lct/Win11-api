const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // 用户名
  name: {
    type: String,
    default: 'user',
  },
  password: {
    type: String,
    required: [true, '请提供密码!'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
