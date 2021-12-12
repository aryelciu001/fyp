const StudentRouter = require('express').Router()
const StudentController = require('../controllers/student')
const AuthController = require('../controllers/auth')
const { encrypt, passwordIsCorrect } = require('../utils/bcrypt')

StudentRouter.get('/', async function (req, res) {
  StudentController.getStudent()
    .then((student) => res.send(student))
    .catch((e) => res.status(400).send({ code: e.code }))
})

StudentRouter.post('/', AuthController.isAdmin, async function (req, res) {
  let { studentEmail, studentMatricNumber, password } = req.body

  // lowercase everything
  studentEmail = studentEmail.toLowerCase()
  studentMatricNumber = studentMatricNumber.toLowerCase()

  // hash password
  password = await encrypt(password)

  StudentController.addStudent(studentEmail, studentMatricNumber, password)
    .then(() => res.send({}))
    .catch((e) => res.status(400).send({ code: e.code }))
})

module.exports = StudentRouter