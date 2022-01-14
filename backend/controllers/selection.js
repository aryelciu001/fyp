const { mysqlQuery } = require('../utils/mysqlQuery')
const ErrorMessage = require('../utils/Error/ErrorMessage')
const MyError = require('../utils/Error/Error')

class SelectionController {
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
        if (selectionInfo.selectionopentime > (new Date()).getTime()) return reject(new MyError(ErrorMessage.SELECTION_CLOSED))

        query = `INSERT INTO selection(projno, email)
          VALUES('${projno}', '${email}');`
        await mysqlQuery(query)
        return resolve()
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }

  getSelection = (email) => {
    return new Promise(async (resolve, reject) => {
      try {
        let query = `SELECT * FROM selection WHERE email='${email}';`
        let selection = await mysqlQuery(query)
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
}

module.exports = new SelectionController()
