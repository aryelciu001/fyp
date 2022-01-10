const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')
const { generateToken, verifyToken } = require('../utils/jwt')
const { passwordIsCorrect } = require('../utils/bcrypt')
const Interface = require('../utils/interface')

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
      if (admin.role !== Interface.UserType.ADMIN) return res.status(401).send()
      return next()
    })
  },
  isEligibleStudent(req, res, next) {
    module.exports.isUser(req, res, () => {
      const user = req.body.authenticatedUser
      if (!user.eligible) return res.status(401).send()
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
      return res.status(401).send({
        statusCode: 401,
        message: 'unauthorized'
      })
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
            if (!user.length) return reject(new Error())
            user = user[0]
            // compare password
            if (await passwordIsCorrect(password, user.password)) {
              const token = generateToken({ email: user.email, role: user.role })
              return resolve({ token, email: user.email, role: user.role, eligible: user.eligible })
            } else {
              reject(new Error(e))
            }
          })
          .catch((e) => {
            reject(new Error(e))
          })
    })
  },
}
