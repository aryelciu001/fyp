const { mysqlQuery } = require('../utils/mysqlQuery')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')
const SqlString = require('sqlstring')

class SelectionInfoController {
  /**
   * @description update time and open/close project selection
   * @param {*} time
   * @param {*} open
   */
  updateSelectionInfo = (opentime, closetime, open) => {
    const query = SqlString.format(`UPDATE selectioninfo
      SET selectionopen=?, selectionopentime=?, selectionclosetime=?
      WHERE id=1;`, [open, opentime, closetime])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description get selectioninfo
   */
  getSelectionOpenTime = () => {
    const query = `SELECT * from selectioninfo
      WHERE id=1;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((selectionInfo) => resolve(selectionInfo[0]))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
}

module.exports = new SelectionInfoController()
