const logger = require('../utils/logger')
const ReservationRouter = require('express').Router()
const ReservationController = require('../controllers/reservation')
const AuthController = require('../controllers/auth')

/**
 * @description add new reservation
 * @requires role: eligible student
 * @requestBody
 * - email
 * - projno
 */
 ReservationRouter.post('/', AuthController.isEligibleStudent, async function(req, res) {
  const { email, projno } = req.body

  ReservationController.addReservation(email, projno)
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

/**
 * @description delete reservation
 * @requires role: eligible student
 * @parameters
 * - email
 * - projno
 */
 ReservationRouter.delete('/:email&:projno', AuthController.isEligibleStudent, async function(req, res) {
  const { email, projno } = req.params
  ReservationController.deleteReservation(email, projno)
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

module.exports = ReservationRouter