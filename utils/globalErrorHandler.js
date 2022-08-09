const AppError = require('./../utils/appError');

// 无效值错误
const handleCastErrorDB = err => {
  const message = `无效的值 ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

// 重名错误
const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `重复的值: ${value}. 请跟换一个新值!`;

  return new AppError(message, 400);
};

// 无效值错误
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `无效的输入数据. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// jwt验证失败错误
const handleJWTError = () => new AppError('无效的token. 请重新登录!', 401);

// jwt过期错误
const handleJWTExpiredError = () =>
  new AppError('token 已过期! 请重新登录', 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = null;

  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
  if (err.name === 'JsonWebTokenError') error = handleJWTError();
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError(err);
  error = error || err;

  console.log(error);
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
