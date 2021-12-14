const jwt = require('jsonwebtoken');

module.exports = {
  /**
   * @description generate jwt token
   * @param payload user info object
   * @returns jwt token
   */
  generateToken: function(payload) {
    return jwt.sign(
      payload, 
      process.env.JWT, 
      {
        expiresIn: 60 * 60 * 24
      }
    );
  },
  /**
   * @description verify and parse user info from token
   * @param token 
   * @returns user info object
   */
  verifyToken: function(token) {
    return jwt.verify(token, process.env.JWT)
  }
}