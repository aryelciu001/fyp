const UserRouter = require('express').Router()
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')
const { encrypt } = require('../utils/bcrypt')

/**
 * @description get list of students
 * @requires role:admin
 */
UserRouter.get('/', AuthController.isAdmin, async function (req, res) {
  UserController.getAllUser()
    .then((user) => res.send(user))
    .catch((e) => res.status(500).send({ code: e.code }))
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

  // lowercase everything
  email = email.toLowerCase()
  studentMatricNumber = studentMatricNumber.toLowerCase()

  // hash password
  password = await encrypt(password)

  UserController.addUser(email, studentMatricNumber, password, role)
    .then(() => res.send({}))
    .catch((e) => res.status(500).send({ code: e.code }))
})

module.exports = UserRouter