const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const SqlString = require('sqlstring')

class VerificationcodeController {
  /**
   * @description add verification code to db 
   * @param {*} email 
   * @param {*} code 
   * @returns 
   */
  addCode = async (email, code) => {
    const query = SqlString.format('INSERT INTO verificationcode (email, code) VALUES (?,?);', [email, code])
    return mysqlQuery(query)
  }

  /**
   * @description verify code with code in db
   * @param {*} email 
   * @param {*} code 
   * @returns 
   */
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

  /**
   * @description delete verification code
   * @param {*} email 
   * @returns 
   */
  deleteCode = async (email) => {
    const query = SqlString.format('DELETE FROM verificationcode WHERE email=?;', [email])
    return mysqlQuery(query)
  }

  /**
   * @description get verification code using email
   * @param {*} email 
   * @returns 
   */
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