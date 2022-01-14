const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

module.exports = {
  updateSelection: (time, open) => {
    const query = `UPDATE selectioninfo
      SET selectionopen=${open}, selectionopentime=${time}
      WHERE id=1;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  },
}
