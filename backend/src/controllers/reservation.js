const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')
const SqlString = require('sqlstring')

class ReservationController {
  /**
   * @description add reservation
   * @param {*} email
   * @param {*} projno
   */
  addReservation = (email, projno) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = SqlString.format(`SELECT * FROM reservation
          where email=? AND projno=?;`, [email, projno])
        const duplicateReservation = await mysqlQuery(query)
        if (duplicateReservation.length) {
          return reject(new MyError(ErrorMessage.ER_DUP_ENTRY))
        }

        query = SqlString.format(`INSERT INTO reservation 
          (email, projno) 
          VALUES (?, ?);`, [email, projno])
        await mysqlQuery(query)
        return resolve()
      } catch (e) {
        return defaultErrorHandler(e, reject)
      }
    })
  }

  /**
   * @description delete reservation
   * @param {*} email
   * @param {*} projno
   */
  deleteReservation = (email, projno) => {
    const query = SqlString.format(`DELETE FROM reservation 
      WHERE email=? AND projno=?;`, [email, projno])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description get user's reservation
   * @param {*} email
   * @returns reservations
   */
  getUserReservation = (email) => {
    const query = SqlString.format(`SELECT * FROM reservation WHERE email=?;`, [email])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((reservations) => resolve(reservations))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description return a table to be used for report
   * @returns query
   */
  getReservationReportData = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT u.email as student_email, u.matriculation_number, p.projno, p.supervisor, p.email as supervisor_email, p.title
          FROM reservation as r
          JOIN user as u
          ON r.email = u.email
          JOIN project as p
          ON r.projno = p.projno;`
        const data = await mysqlQuery(query)
        return resolve(data)
      } catch (e) {
        return defaultErrorHandler(e, reject)
      }
    })
  }
}

module.exports = new ReservationController()
