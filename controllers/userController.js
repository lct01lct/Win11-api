const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      id: 1,
      name: 'zs',
    },
  });
});
