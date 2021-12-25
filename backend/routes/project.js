const csv = require('csvtojson')
const fs = require('fs')
const multer  = require('multer')
const upload = multer()
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
      return res.status(500).send()
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
      return res.status(500).send()
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
      return res.status(500).send()
    })
})

/**
 * @description delete FYP
 * @requires role:admin
 * @param projectId
 */
ProjectRouter.delete('/:id', AuthController.isAdmin, function (req, res) {
  const { id } = req.params
  ProjectController.deleteFyp(id)
    .then(() => res.send({}))
    .catch((e) => {
      return res.status(500).send()
    })
})

/**
 * @description add project via csv file
 * @requires role:admin
 * @requestBody
 * - csv file
 */
 ProjectRouter.post('/csv', upload.single('csvFile'), AuthController.isAdmin, async function (req, res) {
  let file = req.file.buffer
  let data = file.toString()
  let fyps = await csv().fromString(data);
  let promises = []
  fyps.forEach(fyp => {
    promises.push(ProjectController.addFyp(fyp['Title'], fyp['Proj No'], fyp['Summary'], fyp['Supervisor'], fyp['Email']))
  })
  Promise.allSettled(promises)
    .then(() => res.send())
})

module.exports = ProjectRouter