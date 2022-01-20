const logger = require('../utils/logger')
const ReservationRouter = require('express').Router()
const ReservationController = require('../controllers/reservation')
const AuthController = require('../controllers/auth')
const ProjectController = require('../controllers/project')
const ErrorResponse = require('../utils/Error/ErrorResponse')

/**
 * @description get reservation of student
 */
ReservationRouter.get('/', AuthController.isUser, async function(req, res) {
  const { email } = req.body.authenticatedUser

  ReservationController.getReservation(email)
    .then(async (reservations) => {
      let reservationsWithInfo = []
      let reservationWithInfo
      let project
      for (const reservation of reservations) {
        reservationWithInfo = { ...reservation }
        project = await ProjectController.getOneProject(reservation.projno)
        project = project[0]
        if (project.selected) continue
        reservationWithInfo['project'] = project
        reservationsWithInfo.push(reservationWithInfo)
      }
      return res.send(reservationsWithInfo)
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
ReservationRouter.post('/', AuthController.isUser, async function(req, res) {
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

/**
 * @description get all reservation
 */
ReservationRouter.get('/all', AuthController.isAdmin, async function(req, res) {
  ReservationController.generateReport()
    .then((data) => res.send(data))
    .catch((e) => {
      logger.error(e.message)
      return ErrorResponse(e, res)
    })
})

module.exports = ReservationRouter
