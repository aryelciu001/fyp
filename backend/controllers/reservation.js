const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
  /**
   * @description add reservation
   * @param {*} email 
   * @param {*} projno 
   */
  addReservation: function(email, projno) {
    const query = `INSERT INTO reservation 
      (email, projno) 
      VALUES ('${email}', '${projno}';`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
  /**
   * @description delete reservation
   * @param {*} email 
   * @param {*} projno 
   */
  deleteReservation: function(email, projno) {
    const query = `DELETE FROM reservation 
      WHERE email='${email}' AND projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
}