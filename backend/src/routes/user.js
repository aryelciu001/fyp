const csv = require('csvtojson')
const UserRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const { UserType } = require('../utils/interface')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

/**
 * @description get list of students
 * @requires role:admin
 */
UserRouter.get('/', AuthController.isAdmin, async function(req, res) {
  UserController.getAllUser()
    .then((user) => res.send(user))
    .catch((e) => {
      return ErrorResponse(e, res)
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
  const { email, studentMatricNumber, password, role, eligible } = req.body

  UserController.addUser(email, studentMatricNumber, password, role, eligible)
    .then(() => res.send({}))
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

/**
 * @description register
 * @requestBody
 * - email
 * - studentMatricNumber
 * - studentPassword
 */
UserRouter.post('/register', async function(req, res) {
  const { email, studentMatricNumber, password } = req.body
  const role = UserType.STUDENT
  const eligible = 0

  try {
    const user = await UserController.getUser(email)
    if (user) {
      return ErrorResponse(new MyError(ErrorMessage.ER_DUP_ENTRY), res)
    }
    await UserController.addUser(email, studentMatricNumber, password, role, eligible)
    return res.send({})
  } catch (e) {
    return ErrorResponse(new MyError(ErrorMessage.SERVER_ERROR), res)
  }
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
  const { email, studentMatricNumber, password, role, eligible } = req.body

  UserController.editUser(email, studentMatricNumber, password, role, eligible)
    .then(() => res.send({}))
    .catch((e) => {
      return ErrorResponse(e, res)
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
      return ErrorResponse(e, res)
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
  let existingUser
  try {
    users.forEach(async (user) => {
      matricNumber = user['matric'] === 'na' ? '' : user['matric']
      existingUser = await UserController.getUser(user['email'])
      if (existingUser) {
        promises.push(UserController.editUser(user['email'], matricNumber, '', user['role'], user['eligible']))
      } else {
        promises.push(UserController.addUser(user['email'], matricNumber, user['password'], user['role'], user['eligible']))
      }
    })
  } catch (e) {

  }
  Promise.allSettled(promises)
    .then(() => res.send())
    .catch((e) => {
      return ErrorResponse(e, res)
    })
})

module.exports = UserRouter
