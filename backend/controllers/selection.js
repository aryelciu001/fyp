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

        query = `INSERT INTO selection(projno, email)
          VALUES('${projno}', '${email}');`
        await mysqlQuery(query)
        return resolve()
      } catch (e) {
        return reject(new MyError(ErrorMessage.SERVER_ERROR))
      }
    })
  }
}

module.exports = new SelectionController()
