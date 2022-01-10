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
      VALUES ('${email}', '${projno}');`
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
  /**
   * @description get user's reservation
   * @param {*} email 
   * @returns reservations
   */
  getReservation: function(email) {
    const query = `SELECT * FROM reservation WHERE email='${email}';`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((reservations) => resolve(reservations))
        .catch((e) => reject(e))
    })
  }
}