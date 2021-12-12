const ProjectRouter = require('express').Router()
const ProjectController = require('../controllers/project')
const AuthController = require('../controllers/auth')

ProjectRouter.get('/', function (req, res) {
  return res.send({})
})

ProjectRouter.post('/', AuthController.isAdmin, function (req, res) {
  const { projectTitle, projectId, projectInfo, supervisorName, supervisorId } = req.body
  ProjectController.addFyp(projectTitle, projectId, projectInfo, supervisorName, supervisorId)
    .then(() => res.send({}))
    .catch((e) => res.status(400).send({ code: e.code }))
})

module.exports = ProjectRouter