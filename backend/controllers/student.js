const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
  addStudent: function(studentEmail, studentMatricNumber, password) {
    const query = `INSERT INTO student 
      (email, matriculation_number, password) 
      VALUES ('${studentEmail}', '${studentMatricNumber}', '${password}');`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
  getStudent: function() {
    const query = `SELECT * FROM student;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((student) => resolve(student))
        .catch((e) => reject(e))
    })
  }
}