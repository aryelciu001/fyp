const { mysqlQuery } = require('../utils/mysqlQuery')
const SqlString = require('sqlstring')

class VerificationcodeController {
  addCode = async (email, code) => {
    const query = SqlString.format('INSERT INTO verificationcode (email, code) VALUES (?,?);', [email, code])
    return mysqlQuery(query)
  }

  verifyCode = async (email, code) => {
    const query = SqlString.format('SELECT * FROM verificationcode WHERE email=?;', [email])
    let correctCode = await mysqlQuery(query)
    correctCode = correctCode[0].code
    if (code === correctCode) {
      return true
    }
    return false
  }

  deleteCode = async (email) => {
    const query = SqlString.format('DELETE FROM verificationcode WHERE email=?;', [email])
    return mysqlQuery(query)
  }

  getCode = async (email) => {
    const query = SqlString.format('SELECT * FROM verificationcode WHERE email=?;', [email])
    let correctCode = await mysqlQuery(query)
    correctCode = correctCode[0].code
    return correctCode
  }
}

module.exports = new VerificationcodeController()