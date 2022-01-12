const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')

module.exports = {
  openSelection: (time) => {
    const query = `UPDATE selectioninfo
      SET selectionopen=1, selectionopentime=${time}
      WHERE condition id=1;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(e))
    })
  }
}
