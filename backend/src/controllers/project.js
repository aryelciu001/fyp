const { mysqlQuery } = require('../utils/mysqlQuery')
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
  addProject = async (title, projno, summary, supervisor, email) => {
    const query = SqlString.format(`INSERT INTO project 
      (title, projno, summary, email, supervisor) 
      VALUES ( ? , ? , ? , ? , ? );`, [title, projno, summary, email, supervisor])
    return await mysqlQuery(query)
  }

  /**
   * @description function to read project[] from db
   * @return project[]
   */
  getProject = async () => {
    const query = `SELECT * FROM project WHERE selected=0;`
    return await mysqlQuery(query)
  }

  /**
   * @description get one project
   * @return project[]
   */
  getOneProject = async (projno) => {
    const query = SqlString.format(`SELECT * FROM project WHERE projno=?;`, [projno])
    return mysqlQuery(query)
  }

  /**
   * @description edit project
   * @param title
   * @param projno
   * @param summary
   * @param supervisor
   * @param email
   */
  editProject = async (title, projno, summary, supervisor, email) => {
    const query = SqlString.format(`UPDATE project
      SET title=?, projno=?, summary=?, email=?, supervisor=?
      WHERE projno=?;`, [title, projno, summary, email, supervisor, projno])
    return mysqlQuery(query)
  }

  /**
   * @description delete project
   * @param projno
   */
  deleteProject = async (projno) => {
    const query = SqlString.format(`DELETE FROM project 
      WHERE projno=?;`, [projno])
    return mysqlQuery(query)
  }

  /**
   * @description set project to selected
   * @param {*} projno
   * @returns
   */
  selectProject = async (projno) => {
    const query = SqlString.format(`UPDATE project SET selected=1 WHERE projno=?;`, [projno])
    return mysqlQuery(query)
  }
}

module.exports = new ProjectController()
