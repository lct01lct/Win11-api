const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res) => {

  const { id } = req.user

  const user = await User.findOne({_id:id})

  const { name } = user

  res.status(200).json({
    status: 'success',
    data: {
      id,
      name,
    },
  });
});

