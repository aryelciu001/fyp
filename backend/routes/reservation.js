const logger = require('../utils/logger')
const ReservationRouter = require('express').Router()
const ReservationController = require('../controllers/reservation')
const AuthController = require('../controllers/auth')
const ProjectController = require('../controllers/project')
const ErrorResponse = require('../utils/Error/ErrorResponse')

ReservationRouter.get('/', AuthController.isEligibleStudent, async function(req, res) {
  const { email } = req.body.authenticatedUser

  ReservationController.getReservation(email)
    .then(async (reservations) => {
      let project
      for (const reservation of reservations) {
        project = await ProjectController.getOneProject(reservation.projno)
        reservation['project'] = project[0]
      }
      return res.send(reservations)
    })
    .catch((e) => {
      logger.error(e.message)
      return res.status(500).send({
        statusCode: 500,
        message: 'Something went wrong',
      })
    })
})

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
      logger.error(e.message)
      return ErrorResponse(e, res)
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
      logger.error(e.message)
      return ErrorResponse(e, res)
    })
})

module.exports = ReservationRouter
