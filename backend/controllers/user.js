const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
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
  getUserBasedOnRole: function(role) {
    const query = `SELECT * FROM user WHERE role="${role}";`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((student) => resolve(student))
        .catch((e) => reject(e))
    })
  },
}