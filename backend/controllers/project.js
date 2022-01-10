const logger = require('../utils/logger')
const { mysqlQuery } = require('../utils/mysqlQuery')

const Project = {
  /**
   * @description function to insert project to db
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  addFyp: function(title, projno, summary, supervisor, email) {
    const query = `INSERT INTO fyp 
      (title, projno, summary, email, supervisor) 
      VALUES ('${title}', '${projno}', '${summary}', '${email}', '${supervisor}');`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
  /**
   * @description function to read fyp[] from db
   * @return fyp[]
   */
  getFyp: function() {
    const query = `SELECT * FROM fyp;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then((fyp) => resolve(fyp))
          .catch((e) => reject(e))
    })
  },
  /**
   * @description edit fyp
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  editFyp: function(title, projno, summary, supervisor, email) {
    const query = `UPDATE fyp 
      SET title='${title}', projno='${projno}', summary='${summary}', email='${email}', supervisor='${supervisor}'
      WHERE projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
  /**
   * @description delete fyp
   * @param projno
   */
  deleteFyp: function(projno) {
    const query = `DELETE FROM fyp 
      WHERE projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
  /**
   * @
   * @param {*} projno 
   */
  reserveFyp: function(projno) {

  },
}

module.exports = Project
