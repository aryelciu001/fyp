const AuthRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const UserController = require('../controllers/user')
const { verifyToken } = require('../utils/jwt')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

/**
 * @description login route
 * @requestBody
 * - email: string
 * - password: string
 * @returns jwt token
 */
AuthRouter.post('/login', async function(req, res) {
  const { email, password } = req.body
  AuthController.login(email, password)
    .then((user) => res.status(200).send(user))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

/**
 * @description get user info from token
 * @return user { email, role }
 */
AuthRouter.get('/:token', async function(req, res) {
  const token = req.params.token
  let user
  try {
    user = verifyToken(token)
    user = await UserController.getUser(user.email)
    if (!user) return ErrorResponse(new MyError(ErrorMessage.UNAUTHORIZED), res)
    return res.status(200).send(user)
  } catch (e) {
    return ErrorResponse(e, res)
  }
})

module.exports = AuthRouter
