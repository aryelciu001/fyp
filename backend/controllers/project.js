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
  addProject: function(title, projno, summary, supervisor, email) {
    const query = `INSERT INTO project 
      (title, projno, summary, email, supervisor) 
      VALUES ('${title}', '${projno}', '${summary}', '${email}', '${supervisor}');`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
  /**
   * @description function to read project[] from db
   * @return project[]
   */
  getProject: function() {
    const query = `SELECT * FROM project;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then((project) => resolve(project))
          .catch((e) => reject(e))
    })
  },
  /**
   * @description get one project
   * @return project[]
   */
   getOneProject: function(projno) {
    const query = `SELECT * FROM project WHERE projno='${projno}';`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then((project) => resolve(project))
          .catch((e) => reject(e))
    })
  },
  /**
   * @description edit project
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  editProject: function(title, projno, summary, supervisor, email) {
    const query = `UPDATE project 
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
   * @description delete project
   * @param projno
   */
  deleteProject: function(projno) {
    const query = `DELETE FROM project 
      WHERE projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
}

module.exports = Project
