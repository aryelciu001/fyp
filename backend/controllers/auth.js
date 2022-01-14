const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')
const { generateToken, verifyToken } = require('../utils/jwt')
const { passwordIsCorrect } = require('../utils/bcrypt')
const Interface = require('../utils/interface')
const UserController = require('./user')
const user = require('./user')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

module.exports = {
  /**
   * @description express middleware to authenticate admin
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isAdmin(req, res, next) {
    module.exports.isUser(req, res, () => {
      const admin = req.body.authenticatedUser
      if (admin.role !== Interface.UserType.ADMIN) {
        return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
      } 
      return next()
    })
  },
  /**
   * @description express middleware to authenticate eligible student
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isEligibleStudent(req, res, next) {
    module.exports.isUser(req, res, async () => {
      let user = req.body.authenticatedUser
      user = await UserController.getUser(user.email)
      if (user.role !== Interface.UserType.STUDENT || !user.eligible) {
        return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
      }
      return next()
    })
  },
  /**
   * @description express middleware to authenticate user
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isUser(req, res, next) {
    const jwtToken = req.headers.authorization
    try {
      const user = verifyToken(jwtToken)
      req.body.authenticatedUser = user
      return next()
    } catch (e) {
      return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
    }
  },
  /**
   * @description Login
   * @requestBody
   * - email: string,
   * - password: string
   * @return Object
   * - token
   * - email
   * - role
   */
  login: function(email, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM user WHERE email="${email}"`
      mysqlQuery(query)
          .then(async (user) => {
            if (!user.length) return reject(new MyError(ErrorMessage.UNAUTHORIZED))
            user = user[0]
            // compare password
            if (await passwordIsCorrect(password, user.password)) {
              const token = generateToken({ email: user.email, role: user.role })
              return resolve({ token, email: user.email, role: user.role, eligible: user.eligible })
            } else {
              reject(new MyError(ErrorMessage.UNAUTHORIZED))
            }
          })
          .catch((e) => {
            reject(new MyError(ErrorMessage.SERVER_ERROR))
          })
    })
  },
}
