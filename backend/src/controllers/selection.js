const { mysqlQuery } = require('../utils/mysqlQuery')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const MyError = require('../utils/Error/Error')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')
const SqlString = require('sqlstring')

class SelectionController {
  /**
   * @description select project
   * @param {*} projno
   * @param {*} email
   */
  // TODO: use SQLstring
  selectProject = (projno, email) => {
    // TODO: HANDLE DUPLICATE AND STUFF IN ROUTER
    // TODO: use async to wrap return value
    return new Promise(async (resolve, reject) => {
      try {
        let query = SqlString.format(`SELECT * FROM selection WHERE projno=?;`, [projno])
        const projectSelected = await mysqlQuery(query)

        if (projectSelected.length) return reject(new MyError(ErrorMessage.PROJECT_SELECTED))

        query = SqlString.format(`SELECT * FROM selection WHERE email=?;`, [email])
        const userHasSelected = await mysqlQuery(query)

        if (userHasSelected.length) return reject(new MyError(ErrorMessage.USER_HAS_SELECTED))

        query = `SELECT * FROM selectioninfo WHERE id=1`
        let selectionInfo = await mysqlQuery(query)
        selectionInfo = selectionInfo[0]

        if (!selectionInfo.selectionopen) return reject(new MyError(ErrorMessage.SELECTION_CLOSED))

        const now = (new Date()).getTime()
        if (selectionInfo.selectionopentime > now) return reject(new MyError(ErrorMessage.SELECTION_CLOSED))
        if (selectionInfo.selectionclosetime < now) return reject(new MyError(ErrorMessage.SELECTION_CLOSED))

        // insert into selection db
        query = SqlString.format(`INSERT INTO selection(projno, email)
          VALUES(?, ?);`, [projno, email])
        await mysqlQuery(query)

        // update project, set selected to true
        query = SqlString.format(`UPDATE project SET selected=1 WHERE projno=?;`, [projno])
        await mysqlQuery(query)

        return resolve()
      } catch (e) {
        return defaultErrorHandler(e, reject)
      }
    })
  }

  /**
   * @description get user selection
   * @param {*} email
   * @returns selection by the user with the email
   */
  getSelection = (email) => {
    const query = SqlString.format(`SELECT p.title, p.projno, p.email as supervisorEmail, p.supervisor as supervisorName, p.summary
      FROM selection as s
      JOIN project as p
      ON s.projno = p.projno
      WHERE s.email = ?;`, [email])
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
