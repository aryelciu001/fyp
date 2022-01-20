const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

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
        .catch((e) => console.log(e) && reject(new MyError(ErrorMessage.SERVER_ERROR)))
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
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
}

module.exports = new SelectionInfoController()
