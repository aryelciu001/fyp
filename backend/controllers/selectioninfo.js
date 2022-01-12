const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
  updateSelection: (time, open) => {
    const query = `UPDATE selectioninfo
      SET selectionopen=${open}, selectionopentime=${time}
      WHERE id=1;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  },
}
