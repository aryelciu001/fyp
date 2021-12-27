const csv = require('csvtojson')
const multer = require('multer')
const upload = multer()
const ProjectRouter = require('express').Router()
const ProjectController = require('../controllers/project')
const AuthController = require('../controllers/auth')

/**
 * @description get list of FYPs
 * @requires role:any
 * @returns fyp[]
 */
ProjectRouter.get('/', AuthController.isUser, function(req, res) {
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
 * - title
 * - projno
 * - summary
 * - supervisor
 * - email
 */
ProjectRouter.post('/', AuthController.isAdmin, function(req, res) {
  const { title, projno, summary, supervisor, email } = req.body
  ProjectController.addFyp(title, projno, summary, supervisor, email)
      .then(() => res.send({}))
      .catch((e) => {
        return res.status(500).send()
      })
})

/**
 * @description edit FYP
 * @requires role:admin
 * @requestBody
 * - title
 * - projno
 * - summary
 * - supervisor
 * - email
 */
ProjectRouter.put('/', AuthController.isAdmin, function(req, res) {
  const { title, projno, summary, supervisor, email } = req.body
  ProjectController.editFyp(title, projno, summary, supervisor, email)
      .then(() => res.send({}))
      .catch((e) => {
        return res.status(500).send()
      })
})

/**
 * @description delete FYP
 * @requires role:admin
 * @param projno
 */
ProjectRouter.delete('/:id', AuthController.isAdmin, function(req, res) {
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
ProjectRouter.post('/csv', upload.single('csvFile'), AuthController.isAdmin, async function(req, res) {
  const file = req.file.buffer
  const data = file.toString()
  const fyps = await csv().fromString(data)
  const promises = []
  fyps.forEach((fyp) => {
    promises.push(ProjectController.addFyp(fyp['Title'], fyp['Proj No'], fyp['Summary'], fyp['Supervisor'], fyp['Email']))
  })
  Promise.allSettled(promises)
      .then(() => res.send())
})

module.exports = ProjectRouter
