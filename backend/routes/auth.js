const AuthRouter = require('express').Router()
const AuthController = require('../controllers/auth')

AuthRouter.get('/', AuthController.isAdmin, function (req, res) {
  return res.send({})
})

module.exports = AuthRouter