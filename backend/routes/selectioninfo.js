const logger = require('../utils/logger')
const SelectionInfoRouter = require('express').Router()
const AuthController = require('../controllers/auth')
const SelectionInfoController = require('../controllers/selectioninfo')

/**
 * @description open selection time
 * @requires role: admin
 * @requestBody
 * - time (int)
 */
 SelectionInfoRouter.post('/', AuthController.isAdmin, async function(req, res) {
  const { time } = req.body

  SelectionInfoController.openSelection(time)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({
        level: 'error',
        message: e
      })
      return res.status(500).send({
        statusCode: 500,
        message: "Something went wrong"
      })
    })
})

module.exports = SelectionInfoRouter