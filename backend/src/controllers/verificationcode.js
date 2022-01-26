const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const SqlString = require('sqlstring')

class VerificationcodeController {
  addCode = async (email, code) => {
    const query = SqlString.format('INSERT INTO verificationcode (email, code) VALUES (?,?);', [email, code])
    return mysqlQuery(query)
  }

  verifyCode = async (email, code) => {
    try {
      const query = SqlString.format('SELECT * FROM verificationcode WHERE email=?;', [email])
      let correctCode = await mysqlQuery(query)
      correctCode = correctCode[0].code
      if (code === correctCode) {
        return true
      }
      return false
    } catch (e) {
      throw new MyError(ErrorMessage.WRONG_VERIFICATION_CODE)
    }
  }

  deleteCode = async (email) => {
    const query = SqlString.format('DELETE FROM verificationcode WHERE email=?;', [email])
    return mysqlQuery(query)
  }

  getCode = async (email) => {
    try {
      const query = SqlString.format('SELECT * FROM verificationcode WHERE email=?;', [email])
      let correctCode = await mysqlQuery(query)
      correctCode = correctCode[0].code
      return correctCode
    } catch (e) {
      throw new MyError(ErrorMessage.WRONG_VERIFICATION_CODE)
    }
  }
}

module.exports = new VerificationcodeController()