const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./utils/globalErrorHandler');
const userRouter = require('./routes/user');
const salaryToken = require('./utils/salaryToken')

const app = express();

// token解密,使用req.user可以获取加密内容
app.use(express.json());

app.use(salaryToken())

app.use('/api/users', userRouter);

// 错误中间件 
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 全局错误函数处理
app.use(globalErrorHandler);

module.exports = app;
