const jwt = require('jsonwebtoken');

module.exports = {
  generateToken: function(payload) {
    return jwt.sign(
      payload, 
      process.env.JWT, 
      {
        expiresIn: 60 * 60 * 24
      }
    );
  },
  verifyToken: function(token) {
    return jwt.verify(token, process.env.JWT)
  }
}