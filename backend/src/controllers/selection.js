const { mysqlQuery } = require('../utils/mysqlQuery')
const SqlString = require('sqlstring')

class SelectionController {
  /**
   * @description select project
   * @param {*} projno
   * @param {*} email
   */
  selectProject = async (projno, email) => {
    const query = SqlString.format(`INSERT INTO selection(projno, email)
      VALUES(?, ?);`, [projno, email])
    return mysqlQuery(query)
  }

  /**
   * @description get user selection
   * @param {*} email
   * @returns selection by the user with the email
   */
  getUserSelection = (email) => {
    const query = SqlString.format(`SELECT p.title, p.projno, p.email as supervisorEmail, p.supervisor as supervisorName, p.summary
      FROM selection as s
      JOIN project as p
      ON s.projno = p.projno
      WHERE s.email = ?;`, [email])
    return mysqlQuery(query)
  }

  // TODO: docs
  getSelectionWithProjno = async (projno) => {
    const query = SqlString.format(`SELECT * FROM selection WHERE projno=?;`, [projno])
    return mysqlQuery(query)
  }

  getSelectionWithEmail = async (email) => {
    const query = SqlString.format(`SELECT * FROM selection WHERE email=?;`, [email])
    return mysqlQuery(query)
  }

  /**
   * @description return a table to be used for report
   * @returns query `
   */
   getSelectionReportData = async () => {
    const query = `SELECT u.email as student_email, u.matriculation_number, p.projno, p.supervisor, p.email as supervisor_email, p.title
      FROM selection as s
      JOIN user as u
      ON s.email = u.email
      JOIN project as p
      ON s.projno = p.projno;`
    return mysqlQuery(query)
  }
}

module.exports = new SelectionController()
