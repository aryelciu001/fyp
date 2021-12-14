const AuthRouter = require('express').Router()
const AuthController = require('../controllers/auth')

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
    .then(token => res.status(200).send(token))
    .catch(e => res.status(401).send(e.code))
})

module.exports = AuthRouter