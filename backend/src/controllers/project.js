const { mysqlQuery } = require('../utils/mysqlQuery')
const { defaultErrorHandler } = require('../utils/Error/ErrorHandler')
const SqlString = require('sqlstring')

class ProjectController {
  /**
   * @description function to insert project to db
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  addProject = (title, projno, summary, supervisor, email) => {
    const query = SqlString.format(`INSERT INTO project 
      (title, projno, summary, email, supervisor) 
      VALUES ( ? , ? , ? , ? , ? );`, [title, projno, summary, email, supervisor])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description function to read project[] from db
   * @return project[]
   */
  getProject = () => {
    const query = `SELECT * FROM project WHERE selected=0;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((project) => resolve(project))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description get one project
   * @return project[]
   */
  getOneProject = (projno) => {
    const query = SqlString.format(`SELECT * FROM project WHERE projno=?;`, [projno])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((project) => resolve(project))
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description edit project
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  editProject = (title, projno, summary, supervisor, email) => {
    const query = SqlString.format(`UPDATE project
      SET title=?, projno=?, summary=?, email=?, supervisor=?
      WHERE projno=?;`, [title, projno, summary, email, supervisor, projno])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }

  /**
   * @description delete project
   * @param projno
   */
  deleteProject = (projno) => {
    const query = SqlString.format(`DELETE FROM project 
      WHERE projno=?;`, [projno])
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => defaultErrorHandler(e, reject))
    })
  }
}

module.exports = new ProjectController()
