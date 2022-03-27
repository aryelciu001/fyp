const { mysqlQuery } = require("../utils/mysqlQuery");
const { encrypt } = require("../utils/bcrypt");
const SqlString = require("sqlstring");
const MyError = require("../utils/Error/Error");
const ErrorMessage = require("../utils/Error/ErrorMessage");

class UserController {
  /**
   * @description add user to db for admin
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  addUser = async (email, studentMatricNumber, password, role, eligible) => {
    const query = SqlString.format(
      `INSERT INTO user 
      (email, matriculation_number, password, role, eligible) 
      VALUES ( ? , ? , ? , ? , ? )`,
      [email, studentMatricNumber, password, role, eligible]
    );
    return mysqlQuery(query);
  };

  /**
   * @description for user public registration
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  register = async (email, studentMatricNumber, password, role, eligible) => {
    const query = SqlString.format(
      `INSERT INTO user 
      (email, registered_matriculation_number, password, role, eligible, matriculation_number) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [email, studentMatricNumber, password, role, eligible, ""]
    );
    return mysqlQuery(query);
  };

  /**
   * @description edit user
   * @param email
   * @param studentMatricNumber
   * @param password
   * @param role
   */
  editUser = async (email, studentMatricNumber, password, role, eligible) => {
    let query;
    if (!password.length) {
      // if no new password
      query = SqlString.format(
        `UPDATE user 
        SET matriculation_number=?, role=?, eligible=?
        WHERE email=?;`,
        [studentMatricNumber, role, eligible, email]
      );
    } else {
      // if new password is inserted
      // hash password
      password = await encrypt(password);
      query = SqlString.format(
        `UPDATE user 
        SET matriculation_number=?, 
        password=?, 
        role=?,
        eligible=?
        WHERE email=?;`,
        [studentMatricNumber, password, role, eligible, email]
      );
    }
    return mysqlQuery(query);
  };

  /**
   * @description update matric number with admin-supplied matric number
   * @param email
   */
  updateMatricNumber = async (email) => {
    const query = SqlString.format(
      `UPDATE user
      SET registered_matriculation_number=matriculation_number WHERE email=?;`,
      [email]
    );
    return mysqlQuery(query);
  };

  /**
   * @description get user[] with a specific role
   * @param role
   * @return user[]
   */
  getUserBasedOnRole = async (role) => {
    const query = SqlString.format(`SELECT * FROM user WHERE role=?;`, [role]);
    return mysqlQuery(query);
  };

  /**
   * @description get all user
   * @return user[]
   */
  getAllUser = async () => {
    const query = `SELECT * FROM user;`;
    return mysqlQuery(query);
  };

  /**
   * @description delete user with specified email
   * @param id (email for user)
   */
  deleteUser = async (email) => {
    const query = SqlString.format(
      `DELETE FROM user 
      WHERE email=?;`,
      [email]
    );
    return mysqlQuery(query);
  };

  /**
   * @description get a user using primary key (email)
   * @param {*} email
   * @returns user
   */
  getUser = async (email) => {
    const query = SqlString.format(
      `SELECT * FROM user 
      WHERE email=?;`,
      [email]
    );
    const user = await mysqlQuery(query);
    return user[0];
  };

  /**
   * @description check if registered matric number is valid (from admin)
   * @param {*} email
   * @returns
   */
  verifyMatricNumber = async (email) => {
    const user = await this.getUser(email);
    const registeredMatric = user.registered_matriculation_number;
    const validMatric = user.matriculation_number;
    if (registeredMatric === validMatric) return true;
    return false;
  };
}

module.exports = new UserController();
