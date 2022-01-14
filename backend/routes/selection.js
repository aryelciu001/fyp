const logger = require('../utils/logger')
const SelectionRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const SelectionController = require('../controllers/selection')
const ErrorResponse = require('../utils/Error/ErrorResponse')

/**
 * @description open/close selection time
 * @requires role: admin
 * @requestBody
 * - time (int)
 * - open (1 or 0)
 */
SelectionRouter.post('/', AuthController.isEligibleStudent, async function(req, res) {
  const { projno, email } = req.body

  SelectionController.selectProject(projno, email)
      .then(() => res.send({}))
      .catch((e) => {
        logger.error(e.message)
        return ErrorResponse(e, res)
      })
})

module.exports = SelectionRouter
