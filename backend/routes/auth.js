const AuthRouter = require('express').Router()
const AuthController = require('../controllers/auth')

AuthRouter.get('/', AuthController.isAdmin, function (req, res) {
  return res.send({})
})

AuthRouter.post('/login', async function (req, res) {
  const { email, password } = req.body
})

module.exports = AuthRouter