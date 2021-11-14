const StudentRouter = require('express').Router()

StudentRouter.get('/', function (req, res) {
  return res.send({})
})

module.exports = StudentRouter