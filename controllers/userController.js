const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res) => {
  // const newUser = await User.create({
  //   name: 'zs',
  //   password: '123456',
  // });

  res.status(200).json({
    status: 'success',
    data: {
      id: 1,
      name: 'zs',
    },
  });
});

