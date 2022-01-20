const logger = require('../utils/logger')
const SelectionInfoRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const SelectionInfoController = require('../controllers/selectioninfo')
const ErrorResponse = require('../utils/Error/ErrorResponse')

/**
 * @description open/close selection time
 * @requires role: admin
 * @requestBody
 * - time (int)
 * - open (1 or 0)
 */
SelectionInfoRouter.post('/', AuthController.isAdmin, async function(req, res) {
  const { opentime, closetime, open } = req.body
  SelectionInfoController.updateSelectionInfo(opentime, closetime, open)
    .then(() => res.send({}))
    .catch((e) => {
      logger.error(e.message)
      return ErrorResponse(e, res)
    })
})

/**
 * @description get selection info
 */
SelectionInfoRouter.get('/', AuthController.isUser, async function(req, res) {
  SelectionInfoController.getSelectionOpenTime()
    .then((selectionInfo) => res.send(selectionInfo))
    .catch((e) => {
      logger.error(e.message)
      return ErrorResponse(e, res)
    })
})

module.exports = SelectionInfoRouter
