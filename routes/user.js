const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getUser)
  .post((req, res) => {});


module.exports = router;