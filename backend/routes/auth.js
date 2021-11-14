const AuthRouter = require('express').Router()

AuthRouter.get('/', function (req, res) {
  return res.send({})
})

module.exports = AuthRouter