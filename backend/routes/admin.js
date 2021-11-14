const AdminRouter = require('express').Router()

AdminRouter.get('/', function (req, res) {
  return res.send({})
})

module.exports = AdminRouter