const expressJWT = require('express-jwt')

module.exports = () => {
  return expressJWT({
    secret:process.env.JWT_SECRET,
    algorithms:['HS256']
  })
}   