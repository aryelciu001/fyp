const { mysqlQuery } = require('../utils/mysqlQuery')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')

class SelectionInfoController {
  /**
   * @description update time and open/close project selection
   * @param {*} time
   * @param {*} open
   */
  updateSelectionInfo = (opentime, closetime, open) => {
    const query = `UPDATE selectioninfo
      SET selectionopen=${open}, selectionopentime=${opentime}, selectionclosetime=${closetime}
      WHERE id=1;`
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
