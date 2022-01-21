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
    return mysqlQuery(query)
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
  getUserBasedOnRole = async (role) => {
    const query = SqlString.format(`SELECT * FROM user WHERE role=?;`, [role])
    return mysqlQuery(query)
  }
  /**
   * @description get all user
   * @return user[]
   */
  getAllUser = async () => {
    const query = `SELECT * FROM user;`
    return mysqlQuery(query)
  }
  /**
   * @description delete user with specified email
   * @param id (email for user)
   */
  deleteUser = async (email) => {
    const query = SqlString.format(`DELETE FROM user 
      WHERE email=?;`, [email])
    return mysqlQuery(query)
  }
  /**
   * @description get a user using primary key (email)
   * @param {*} email
   * @returns user
   */
  getUser = async (email) => {
    const query = SqlString.format(`SELECT * FROM user 
      WHERE email=?;`, [email])
    const user = await mysqlQuery(query)
    return user[0]
  }
}

module.exports = new UserController()
