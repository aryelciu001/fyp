const csv = require('csvtojson')
const UserRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')

/**
 * @description get list of students
 * @requires role:admin
 */
UserRouter.get('/', AuthController.isAdmin, async function(req, res) {
  UserController.getAllUser()
      .then((user) => res.send(user))
      .catch((e) => {
        return res.status(500).send()
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
UserRouter.post('/', AuthController.isAdmin, async function(req, res) {
  const { email, studentMatricNumber, password, role } = req.body

  UserController.addUser(email, studentMatricNumber, password, role)
      .then(() => res.send({}))
      .catch((e) => {
        return res.status(500).send()
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
UserRouter.put('/', AuthController.isAdmin, async function(req, res) {
  const { email, studentMatricNumber, password, role } = req.body

  UserController.editUser(email, studentMatricNumber, password, role)
      .then(() => res.send({}))
      .catch((e) => {
        return res.status(500).send()
      })
})

/**
 * @description delete user
 * @requires role:admin
 * @param email
 */
UserRouter.delete('/:id', AuthController.isAdmin, async function(req, res) {
  const { id } = req.params

  UserController.deleteUser(id)
      .then(() => res.send({}))
      .catch((e) => {
        return res.status(500).send()
      })
})

/**
 * @description add user via csv file
 * @requires role:admin
 * @requestBody
 * - csv file
 */
 UserRouter.post('/csv', upload.single('csvFile'), AuthController.isAdmin, async function(req, res) {
  const file = req.file.buffer
  const data = file.toString()
  const users = await csv().fromString(data)
  const promises = []
  let matricNumber = ''
  users.forEach((user) => {
    matricNumber = user['matric'] === "na" ? '' : user['matric']
    promises.push(UserController.addUser(user['email'], matricNumber, user['password'], user['role']))
  })
  Promise.allSettled(promises)
      .then(() => res.send())
})

module.exports = UserRouter
