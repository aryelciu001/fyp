const ProjectRouter = require('express').Router()
const ProjectController = require('../controllers/project')
const AuthController = require('../controllers/auth')

/**
 * @description get list of FYPs
 * @requires role:any
 * @returns fyp[]
 */
ProjectRouter.get('/', AuthController.isUser, function (req, res) {
  ProjectController.getFyp()
    .then((fyp) => res.send(fyp))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

/**
 * @description add new FYP
 * @requires role:admin
 * @requestBody
 * - projectTitle
 * - projectId
 * - projectInfo
 * - supervisorName
 * - supervisorId
 */
ProjectRouter.post('/', AuthController.isAdmin, function (req, res) {
  const { projectTitle, projectId, projectInfo, supervisorName, supervisorId } = req.body
  ProjectController.addFyp(projectTitle, projectId, projectInfo, supervisorName, supervisorId)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

/**
 * @description edit FYP
 * @requires role:admin
 * @requestBody
 * - projectTitle
 * - projectId
 * - projectInfo
 * - supervisorName
 * - supervisorId
 */
 ProjectRouter.put('/', AuthController.isAdmin, function (req, res) {
  const { projectTitle, projectId, projectInfo, supervisorName, supervisorId } = req.body
  ProjectController.editFyp(projectTitle, projectId, projectInfo, supervisorName, supervisorId)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

module.exports = ProjectRouter