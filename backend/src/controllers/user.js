const { mysqlQuery } = require('../utils/mysqlQuery')
const { encrypt } = require('../utils/bcrypt')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const SqlString = require('sqlstring');

class UserController {
  /**
   * @description add user to db
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  addUser = async (email, studentMatricNumber, password, role, eligible) => {
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
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
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
      query = `UPDATE user 
        SET matriculation_number='${studentMatricNumber}', role='${role}', eligible=${eligible}
        WHERE email='${email}';`
    } else { // if new password is inserted
      // hash password
      password = await encrypt(password)
      query = `UPDATE user 
        SET matriculation_number='${studentMatricNumber}', 
        password='${password}', 
        role='${role}',
        eligible=${eligible}
        WHERE email='${email}';`
    }
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
  /**
   * @description get user[] with a specific role
   * @param role
   * @return user[]
   */
  getUserBasedOnRole = (role) => {
    const query = `SELECT * FROM user WHERE role="${role}";`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((student) => resolve(student))
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
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
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
  /**
   * @description delete user with specified email
   * @param id (email for user)
   */
  deleteUser = (email) => {
    const query = `DELETE FROM user 
      WHERE email='${email}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
  /**
   * @description get a user using primary key (email)
   * @param {*} email
   * @returns user
   */
  getUser = (email) => {
    const query = `SELECT * FROM user 
      WHERE email='${email}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((users) => resolve(users[0]))
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
}

module.exports = new UserController()
