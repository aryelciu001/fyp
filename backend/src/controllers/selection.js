const { mysqlQuery } = require('../utils/mysqlQuery')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const MyError = require('../utils/Error/Error')

class SelectionController {
  /**
   * @description select project
   * @param {*} projno 
   * @param {*} email 
   */
  selectProject = (projno, email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `SELECT * FROM selection WHERE projno='${projno}'`
        const projectSelected = await mysqlQuery(query)

        if (projectSelected.length) return reject(new MyError(ErrorMessage.PROJECT_SELECTED))

        query = `SELECT * FROM selection WHERE email='${email}'`
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
        query = `INSERT INTO selection(projno, email)
          VALUES('${projno}', '${email}');`
        await mysqlQuery(query)

        // update project, set selected to true
        query = `UPDATE project SET selected=1 WHERE projno='${projno}';`
        await mysqlQuery(query)

        return resolve()
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }

  /**
   * @description get user selection
   * @param {*} email 
   * @returns selection by the user with the email 
   */
  getSelection = (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `SELECT * FROM selection WHERE email='${email}';`
        let selection = await mysqlQuery(query)
        
        if (!selection.length) return resolve([])
        selection = selection[0]

        query = `SELECT * FROM project WHERE projno='${selection.projno}';`
        let project = await mysqlQuery(query)
        project = project[0]

        selection.project = project
        return resolve([selection])
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }

  /**
   * @description return a table to be used for report
   * @returns query
   */
  generateReport = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT u.email as student_email, u.matriculation_number, p.projno, p.supervisor, p.email as supervisor_email, p.title
          FROM selection as s
          JOIN user as u
          ON s.email = u.email
          JOIN project as p
          ON s.projno = p.projno;`
        const data = await mysqlQuery(query)
        return resolve(data)
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }
}

module.exports = new SelectionController()
