const { mysqlQuery } = require("../utils/mysqlQuery");
const SqlString = require("sqlstring");

class SelectionInfoController {
  /**
   * @description update time and open/close project selection
   * @param {*} time
   * @param {*} open
   */
  updateSelectionInfo = async (opentime, closetime, open) => {
    const query = SqlString.format(
      `UPDATE selectioninfo
      SET selectionopen=?, selectionopentime=?, selectionclosetime=?
      WHERE id=1;`,
      [open, opentime, closetime]
    );
    return mysqlQuery(query);
  };

  /**
   * @description get selectioninfo
   */
  getSelectionInfo = async () => {
    const query = `SELECT * from selectioninfo
      WHERE id=1;`;
    const info = await mysqlQuery(query);
    return info[0];
  };
}

module.exports = new SelectionInfoController();
