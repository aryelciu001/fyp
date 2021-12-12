const bcrypt = require('bcrypt')
const saltRounds = 8

module.exports = {
  encrypt: function(pw) {
    return bcrypt.hash(pw, saltRounds)
  },
  passwordIsCorrect: function(plain, hashed) {
    return bcrypt.compare(plain, hashed)
  }
}