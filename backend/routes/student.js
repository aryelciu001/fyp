const StudentRouter = require('express').Router()

StudentRouter.get('/', function (req, res) {
  return res.send({})
})

StudentRouter.post('/', function (req, res) {
  console.log(req.body)
  return res.send({})
})

module.exports = StudentRouter