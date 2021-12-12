const StudentRouter = require('express').Router()
const StudentController = require('../controllers/student')
const AuthController = require('../controllers/auth')

StudentRouter.get('/', AuthController.isAdmin, function (req, res) {
  return res.send({})
})

StudentRouter.post('/', AuthController.isAdmin, function (req, res) {
  const { studentEmail, studentMatricNumber, password } = req.body
  StudentController.addStudent(studentEmail, studentMatricNumber, password)
    .then(() => res.send({}))
    .catch((e) => res.status(400).send({ code: e.code }))
})

module.exports = StudentRouter