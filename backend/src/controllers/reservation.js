const { mysqlQuery } = require('../utils/mysqlQuery')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')
const SqlString = require('sqlstring')

class ReservationController {
  /**
   * @description get one reservation
   * @param {*} email 
   * @param {*} projno 
   * @returns 
   */
  getReservation = async (email, projno) => {
    const query = SqlString.format(`SELECT * FROM reservation
      where email=? AND projno=?;`, [email, projno])
    const reservation = await mysqlQuery(query)
    return reservation[0]
  }
  
  /**
   * @description add reservation
   * @param {*} email
   * @param {*} projno
   */
  addReservation = async (email, projno) => {
    const query = SqlString.format(`INSERT INTO reservation 
      (email, projno) 
      VALUES (?, ?);`, [email, projno])
    return mysqlQuery(query)
  }

  /**
   * @description delete reservation
   * @param {*} email
   * @param {*} projno
   */
  deleteReservation = async (email, projno) => {
    const query = SqlString.format(`DELETE FROM reservation 
      WHERE email=? AND projno=?;`, [email, projno])
    return mysqlQuery(query)
  }

  /**
   * @description get user's reservation
   * @param {*} email
   * @returns reservations
   */
  getUserReservation = async (email) => {
    // TODO: use join to directly populate data
    const query = SqlString.format(`SELECT * FROM reservation WHERE email=?;`, [email])
    return mysqlQuery(query)
  }

  /**
   * @description return a table to be used for report
   * @returns query
   */
  getReservationReportData = async () => {
    const query = `SELECT u.email as student_email, u.matriculation_number, p.projno, p.supervisor, p.email as supervisor_email, p.title
      FROM reservation as r
      JOIN user as u
      ON r.email = u.email
      JOIN project as p
      ON r.projno = p.projno;`
    return mysqlQuery(query)
  }
}

module.exports = new ReservationController()
