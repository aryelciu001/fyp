const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

class ReservationController {
  /**
   * @description add reservation
   * @param {*} email
   * @param {*} projno
   */
  addReservation = (email, projno) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `SELECT * FROM reservation
          where email='${email}' AND projno='${projno}';`
        const duplicateReservation = await mysqlQuery(query)
        if (duplicateReservation.length) {
          return reject(new MyError(ErrorMessage.ER_DUP_ENTRY))
        }

        query = `INSERT INTO reservation 
          (email, projno) 
          VALUES ('${email}', '${projno}');`
        await mysqlQuery(query)
        return resolve()
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }

  /**
   * @description delete reservation
   * @param {*} email
   * @param {*} projno
   */
  deleteReservation = (email, projno) => {
    const query = `DELETE FROM reservation 
      WHERE email='${email}' AND projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
  
  /**
   * @description get user's reservation
   * @param {*} email
   * @returns reservations
   */
  getReservation = (email) => {
    const query = `SELECT * FROM reservation WHERE email='${email}';`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((reservations) => resolve(reservations))
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }

  generateReport = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM reservation;`
        const data = await mysqlQuery(query)
        return resolve(data)
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }
}

module.exports = new ReservationController()