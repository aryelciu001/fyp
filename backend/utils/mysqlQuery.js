const mysql = require('../db')

module.exports = {
  /**
   * @description one-stop mysql caller
   * @param queryText mysql query plain text
   */
  mysqlQuery: function(queryText) {
    return new Promise((resolve, reject) => {
      mysql.query(queryText, (err, result) => {
        if (err) return reject(err)
        return resolve(result)
      })
    })
  },
}
