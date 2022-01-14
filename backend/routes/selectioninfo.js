const logger = require('../utils/logger')
const SelectionInfoRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const SelectionInfoController = require('../controllers/selectioninfo')

/**
 * @description open/close selection time
 * @requires role: admin
 * @requestBody
 * - time (int)
 * - open (1 or 0)
 */
 SelectionInfoRouter.post('/', AuthController.isAdmin, async function(req, res) {
  const { time, open } = req.body

  SelectionInfoController.updateSelection(time, open)
    .then(() => res.send({}))
    .catch((e) => {
      logger.error(e.message)
      return res.status(500).send({
        statusCode: 500,
        message: "Something went wrong"
      })
    })
})

module.exports = SelectionInfoRouter