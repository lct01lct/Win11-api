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
    return next(new AppError('没有该用户!', 401));
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

// 重命名
exports.rename = catchAsync(async (req, res, next) =>{

  // 重命名的名字和token解析来的id
  const { rename } = req.body;
  const { id } = req.user

  // 如果是空，返回
  if(!rename){
    return next(new AppError('请提供要更改的用户名！'),400)
  }

  // 修改用户名
  const {res:modifiedCount} = await User.updateOne({ _id:id },{ $set:{ name:rename } });

  // 修改失败？
  if(!res){
    return next(new AppError('修改失败！？'),400)
  }

  res.status(200).json({
    status:'success'  
  })
})  

// 分发 token
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}
