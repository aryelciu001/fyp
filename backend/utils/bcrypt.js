const bcrypt = require('bcrypt')
const saltRounds = 8

module.exports = {
  /**
   * @description encrypt plain text password
   * @param pw 
   * @returns promise (hashed password when resolved)
   */
  encrypt: function(pw) {
    return bcrypt.hash(pw, saltRounds)
  },
  /**
   * @description check password is correct
   * @param plain 
   * @param hashed 
   * @returns promise (true/false when resolved)
   */
  passwordIsCorrect: function(plain, hashed) {
    return bcrypt.compare(plain, hashed)
  }
}