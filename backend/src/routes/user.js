const csv = require('csvtojson')
const UserRouter = require('express').Router()
const multer = require('multer')
const upload = multer()
const UserController = require('../controllers/user')
const AuthController = require('../controllers/auth')
const VerificationcodeController = require('../controllers/verificationcode')
const MyError = require('../utils/Error/Error')
const ErrorResponse = require('../utils/Error/ErrorResponse')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const { UserType } = require('../utils/interface')
const { encrypt } = require('../utils/bcrypt')
const Mailer = require('../utils/Mailer/Mailer')
const { verifyEmail } = require('../utils/Mailer/messageGenerator')
const { randomCodeGen } = require('../utils/Mailer/codeGenerator')

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
  try {
    let { email, studentMatricNumber, password, role, eligible } = req.body

    const user = await UserController.getUser(email)
    if (user) throw (new MyError(ErrorMessage.ER_DUP_ENTRY))

    // lowercase everything
    email = email.toLowerCase()
    studentMatricNumber = studentMatricNumber.toLowerCase()

    // hash password
    password = await encrypt(password)

    await UserController.addUser(email, studentMatricNumber, password, role, eligible)
    return res.send()
  } catch (e) {
    return ErrorResponse(e, res)
  }
})

/**
 * @description get code to verify email address
 * @requestBody
 * - email
 */
UserRouter.post('/verifyemail', async function(req, res) {
  const { email } = req.body
  let code = randomCodeGen()

  // check if email has been registered
  const user = await UserController.getUser(email)
  if (user) {
    return ErrorResponse(new MyError(ErrorMessage.ER_DUP_ENTRY), res)
  }

  try { // if new email
    await VerificationcodeController.addCode(email, code)
  } catch (e) { // if email is already recorded
    code = await VerificationcodeController.getCode(email)
  }

  const emailPayload = verifyEmail(code)
  
  Mailer.sendEmail(email, emailPayload)
    .catch((e) => ErrorResponse(e, res))

  // finish even before email is sent, so the loading isnt long
  return res.send()
})

/**
 * @description register
 * @requestBody
 * - email
 * - studentMatricNumber
 * - studentPassword
 */
UserRouter.post('/register', async function(req, res) {
  let { email, studentMatricNumber, password, verificationCode } = req.body
  const role = UserType.STUDENT
  const eligible = 0

  try {
    const codeIsCorrect = await VerificationcodeController.verifyCode(email, verificationCode)
    if (!codeIsCorrect) return ErrorResponse(new MyError(ErrorMessage.WRONG_VERIFICATION_CODE), res)

    const user = await UserController.getUser(email)
    if (user) {
      return ErrorResponse(new MyError(ErrorMessage.ER_DUP_ENTRY), res)
    }

    // lowercase everything
    email = email.toLowerCase()
    studentMatricNumber = studentMatricNumber.toLowerCase()

    // hash password
    password = await encrypt(password)

    await UserController.register(email, studentMatricNumber, password, role, eligible)
    await VerificationcodeController.deleteCode(email)
    return res.send()
  } catch (e) {
    return ErrorResponse(e, res)
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
  let { email, studentMatricNumber, password, role, eligible } = req.body

  // lowercase everything
  email = email.toLowerCase()
  studentMatricNumber = studentMatricNumber.toLowerCase()

  UserController.editUser(email, studentMatricNumber, password, role, eligible)
    .then(() => res.send())
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
    .then(() => res.send())
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
  try {
    const file = req.file.buffer
    const data = file.toString()
    const users = await csv().fromString(data)
    const promises = []
    let email; let password; let role; let eligible
    let matricNumber = ''
    let existingUser
    users.forEach(async (user) => {
      matricNumber = user['matric'] === 'na' ? '' : user['matric']
      existingUser = await UserController.getUser(user['email'])
      email = user['email']
      password = user['password']
      role = user['role']
      eligible = user['eligible']

      // lowercase everything
      email = email.toLowerCase()
      matricNumber = matricNumber.toLowerCase()

      // hash password
      password = await encrypt(password)

      if (existingUser) {
        promises.push(UserController.editUser(email, matricNumber, '', role, eligible))
      } else {
        promises.push(UserController.addUser(email, matricNumber, password, role, eligible))
      }
    })
    await Promise.allSettled(promises)
    return res.send()
  } catch (e) {
    return ErrorResponse(e, res)
  }
})

module.exports = UserRouter
