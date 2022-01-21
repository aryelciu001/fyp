const { mysqlQuery } = require('../utils/mysqlQuery')
const { encrypt } = require('../utils/bcrypt')
const SqlString = require('sqlstring')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')

class UserController {
  /**
   * @description add user to db
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  addUser = async (email, studentMatricNumber, password, role, eligible) => {
    // TODO: prepare data in router
    // lowercase everything
    email = email.toLowerCase()
    studentMatricNumber = studentMatricNumber.toLowerCase()

    // hash password
    password = await encrypt(password)

    const query = SqlString.format(`INSERT INTO user 
      (email, matriculation_number, password, role, eligible) 
      VALUES ( ? , ? , ? , ? , ? )`, [email, studentMatricNumber, password, role, eligible])

    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
  /**
   * @description edit user
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  editUser = async (email, studentMatricNumber, password, role, eligible) => {
    let query
    // lowercase everything
    email = email.toLowerCase()
    studentMatricNumber = studentMatricNumber.toLowerCase()
    
    if (!password.length) { // if no new password
      query = SqlString.format(`UPDATE user 
        SET matriculation_number=?, role=?, eligible=?
        WHERE email=?;`, [studentMatricNumber, role, eligible, email])
    } else { // if new password is inserted
      // hash password
      password = await encrypt(password)
      query = SqlString.format(`UPDATE user 
        SET matriculation_number=?, 
        password=?, 
        role=?,
        eligible=?
        WHERE email=?;`, [studentMatricNumber, password, role, eligible, email])
    }
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
  /**
   * @description get user[] with a specific role
   * @param role
   * @return user[]
   */
  getUserBasedOnRole = (role) => {
    const query = SqlString.format(`SELECT * FROM user WHERE role=?;`, [role])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((student) => resolve(student))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
  /**
   * @description get all user
   * @return user[]
   */
  getAllUser = () => {
    const query = `SELECT * FROM user;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((user) => resolve(user))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
  /**
   * @description delete user with specified email
   * @param id (email for user)
   */
  deleteUser = (email) => {
    const query = SqlString.format(`DELETE FROM user 
      WHERE email=?;`, [email])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
  /**
   * @description get a user using primary key (email)
   * @param {*} email
   * @returns user
   */
  getUser = (email) => {
    const query = SqlString.format(`SELECT * FROM user 
      WHERE email=?;`, [email])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((users) => resolve(users[0]))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
}

module.exports = new UserController()
