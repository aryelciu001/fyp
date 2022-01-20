const SelectionRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const SelectionController = require('../controllers/selection')
const ErrorResponse = require('../utils/Error/ErrorResponse')

/**
 * @description select project
 * @requestBody
 * - projno
 * - email
 */
SelectionRouter.post('/', AuthController.isEligibleStudent, async function(req, res) {
  const { projno, email } = req.body

  SelectionController.selectProject(projno, email)
    .then(() => res.send({}))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

/**
 * @description get selection of student
 */
SelectionRouter.get('/', AuthController.isUser, async function(req, res) {
  const { authenticatedUser } = req.body
  SelectionController.getSelection(authenticatedUser.email)
    .then((selection) => res.send(selection))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

/**
 * @description get all selection
 */
SelectionRouter.get('/all', AuthController.isAdmin, async function(req, res) {
  SelectionController.generateReport()
    .then((data) => res.send(data))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

module.exports = SelectionRouter
