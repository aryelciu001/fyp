const SelectionRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const ProjecController = require('../controllers/project')
const SelectionController = require('../controllers/selection')
const SelectionInfoController = require('../controllers/selectioninfo')
const MyError = require('../utils/Error/Error')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const ErrorMessage = require('../utils/Error/ErrorMessage')

/**
 * @description select project
 * @requestBody
 * - projno
 * - email
 */
SelectionRouter.post('/', AuthController.isEligibleStudent, async function(req, res) {
  try {
    const { projno, email } = req.body
    const projectSelected = await SelectionController.getSelectionWithProjno(projno)
    if (projectSelected.length) throw (new MyError(ErrorMessage.PROJECT_SELECTED))

    const userHasSelected = await SelectionController.getSelectionWithEmail(email)
    if (userHasSelected.length) throw (new MyError(ErrorMessage.USER_HAS_SELECTED))

    const selectionInfo = await SelectionInfoController.getSelectionInfo()

    if (!selectionInfo.selectionopen) throw (new MyError(ErrorMessage.SELECTION_CLOSED))

    const now = (new Date()).getTime()
    if (selectionInfo.selectionopentime > now) throw (new MyError(ErrorMessage.SELECTION_CLOSED))
    if (selectionInfo.selectionclosetime < now) throw (new MyError(ErrorMessage.SELECTION_CLOSED))

    await SelectionController.selectProject(projno, email)
    await ProjecController.selectProject(projno)
    return res.send()
  } catch (e) {
    return ErrorResponse(e, res)
  }
})

/**
 * @description get selection of student
 */
SelectionRouter.get('/', AuthController.isUser, async function(req, res) {
  const { authenticatedUser } = req.body
  SelectionController.getUserSelection(authenticatedUser.email)
    .then((selection) => res.send(selection))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

/**
 * @description get all selection
 */
SelectionRouter.get('/all', AuthController.isAdmin, async function(req, res) {
  SelectionController.getSelectionReportData()
    .then((data) => res.send(data))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

module.exports = SelectionRouter
