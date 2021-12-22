const AuthRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const { verifyToken } = require('../utils/jwt')

/**
 * @description login route
 * @requestBody
 * - email: string
 * - password: string
 * @returns jwt token
 */
AuthRouter.post('/login', async function (req, res) {
  const { email, password } = req.body
  AuthController.login(email, password)
    .then(user => res.status(200).send(user))
    .catch(e => {
      logger.log({ level: 'error', message: e})
      return res.status(401).send(e.code)
    })
})

/**
 * @description get user info from token
 * @return user { email, role }
 */
AuthRouter.get('/:token', async function (req, res) {
  let token = req.params.token
  let user
  try {
    user = verifyToken(token)
    return res.status(200).send({...user})
  } catch (e) {
    logger.log({ level: 'error', message: e})
    return res.status(401).send()
  }
})

module.exports = AuthRouter