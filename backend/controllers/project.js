const { mysqlQuery } = require('../utils/mysqlQuery')
const MyError = require('../utils/Error/Error')
const ErrorMessage = require('../utils/Error/ErrorMessage')

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
    const query = `INSERT INTO project 
      (title, projno, summary, email, supervisor) 
      VALUES ('${title}', '${projno}', '${summary}', '${email}', '${supervisor}');`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }

  /**
   * @description function to read project[] from db
   * @return project[]
   */
  getProject = () => {
    const query = `SELECT * FROM project;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((project) => resolve(project))
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }

  /**
   * @description get one project
   * @return project[]
   */
  getOneProject = (projno) => {
    const query = `SELECT * FROM project WHERE projno='${projno}';`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((project) => resolve(project))
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
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
    const query = `UPDATE project 
      SET title='${title}', projno='${projno}', summary='${summary}', email='${email}', supervisor='${supervisor}'
      WHERE projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }

  /**
   * @description delete project
   * @param projno
   */
  deleteProject = (projno) => {
    const query = `DELETE FROM project 
      WHERE projno='${projno}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then(() => resolve())
        .catch((e) => reject(new MyError(ErrorMessage.SERVER_ERROR)))
    })
  }
}

module.exports = new ProjectController()
