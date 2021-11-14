const ProjectRouter = require('express').Router()

ProjectRouter.get('/', function (req, res) {
  return res.send({})
})

module.exports = ProjectRouter