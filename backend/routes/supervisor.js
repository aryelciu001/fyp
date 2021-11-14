const SupervisorRouter = require('express').Router()

SupervisorRouter.get('/', function (req, res) {
  return res.send({})
})

module.exports = SupervisorRouter