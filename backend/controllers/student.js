const { mysqlQuery } = require('./mysqlQuery')

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
  }
}