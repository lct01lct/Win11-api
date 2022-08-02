const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('./../utils/appError');

// 内部使用 - 注册
exports.signup = catchAsync(async (req, res) => {
  const { name, password } = req.body;

  const newUser = await User.create({
    name,
    password,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// 登录
exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  // 判断 name 和 password 是否都存在
  if (!name || !password) {
    return next(new AppError('请提供密码和账户'), 400);
  }

  // 检查 name 是否存在，密码是否正确
  const user = await User.findOne({ name }).select('+password');
  if (!user) {
    return next(new AppError('没有改用户!', 401));
  }
  const correct = await user.correctPassword(password, user.password);
  if (!user || !correct) {
    return next(new AppError('账号或者密码错误', 401));
  }

  // 正确返回 token
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

// 分发 token
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
