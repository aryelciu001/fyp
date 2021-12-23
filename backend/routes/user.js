const UserRouter = require('express').Router()
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')

/**
 * @description get list of students
 * @requires role:admin
 */
UserRouter.get('/', AuthController.isAdmin, async function (req, res) {
  UserController.getAllUser()
    .then((user) => res.send(user))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

/**
 * @description add new user
 * @requires role:admin
 * @requestBody
 * - email
 * - studentMatricNumber
 * - studentPassword
 * - role
 */
UserRouter.post('/', AuthController.isAdmin, async function (req, res) {
  let { email, studentMatricNumber, password, role } = req.body

  UserController.addUser(email, studentMatricNumber, password, role)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

/**
 * @description edit user
 * @requires role:admin
 * @requestBody
 * - email
 * - studentMatricNumber
 * - studentPassword
 * - role
 */
 UserRouter.put('/', AuthController.isAdmin, async function (req, res) {
  let { email, studentMatricNumber, password, role } = req.body

  UserController.editUser(email, studentMatricNumber, password, role)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

/**
 * @description delete user
 * @requires role:admin
 * @params
 * - email
 */
 UserRouter.delete('/:id', AuthController.isAdmin, async function (req, res) {
  let { id } = req.params

  UserController.deleteUser(id)
    .then(() => res.send({}))
    .catch((e) => {
      logger.log({ level: 'error', message: e})
      return res.status(500).send({ code: e.code })
    })
})

module.exports = UserRouter