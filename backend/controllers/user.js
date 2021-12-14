const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
  /**
   * @description add user to db
   * @param email 
   * @param studentMatricNumber 
   * @param password 
   * @param role 
   */
  addUser: function(email, studentMatricNumber, password, role) {
    const query = `INSERT INTO user 
      (email, matriculation_number, password, role) 
      VALUES ('${email}', '${studentMatricNumber}', '${password}', '${role}');`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
  /**
   * @description get user[] with a specific role
   * @param role 
   * @returns user[]
   */
  getUserBasedOnRole: function(role) {
    const query = `SELECT * FROM user WHERE role="${role}";`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((student) => resolve(student))
        .catch((e) => reject(e))
    })
  },
  /**
   * @description get all user
   * @returns user[]
   */
  getAllUser: function() {
    const query = `SELECT * FROM user;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((user) => resolve(user))
        .catch((e) => reject(e))
    })
  },
}