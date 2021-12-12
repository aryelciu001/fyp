const mysql = require('../db')

module.exports = {
  mysqlQuery: function(queryText) {
    return new Promise((resolve, reject) => {
      mysql.query(queryText, (err, result) => {
        if (err) return reject(err)
        return resolve(result)
      })
    })
  }
}