const { generateToken, verifyToken } = require('../utils/jwt')
const { passwordIsCorrect } = require('../utils/bcrypt')
const Interface = require('../utils/interface')
const UserController = require('./user')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

class AuthController {
  /**
   * @description express middleware to authenticate admin
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isAdmin = (req, res, next) => {
    module.exports.isUser(req, res, () => {
      const admin = req.body.authenticatedUser
      if (admin.role !== Interface.UserType.ADMIN) {
        return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
      }
      return next()
    })
  }

  /**
   * @description express middleware to authenticate eligible student
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isEligibleStudent = (req, res, next) => {
    module.exports.isUser(req, res, async () => {
      let user = req.body.authenticatedUser
      user = await UserController.getUser(user.email)
      if (user.role !== Interface.UserType.STUDENT || !user.eligible) {
        return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
      }
      return next()
    })
  }

  /**
   * @description express middleware to authenticate user
   * @requestHeaders
   * - authorization: jwt string
   * @return next function
   */
  isUser = (req, res, next) => {
    const jwtToken = req.headers.authorization
    try {
      const user = verifyToken(jwtToken)
      req.body.authenticatedUser = user
      return next()
    } catch (e) {
      return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
    }
  }

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
  login = async (email, password) => {
    const user = await UserController.getUser(email)

    if (!user) throw (new MyError(ErrorMessage.UNAUTHORIZED))

    const passwordCorrect = await passwordIsCorrect(password, user.password)

    if (!passwordCorrect) throw (new MyError(ErrorMessage.UNAUTHORIZED))

    const token = generateToken({ email: user.email, role: user.role })
    return { 
      token,
      email: user.email,
      role: user.role,
      eligible: user.eligible,
      registered_matriculation_number: user.registered_matriculation_number,
      matriculation_number: user.matriculation_number,
    }
  }
}

module.exports = new AuthController()
