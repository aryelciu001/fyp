const { mysqlQuery } = require('../utils/mysqlQuery')

const Project = {
  /**
   * @description function to insert project to db
   * @param projectTitle
   * @param projectId
   * @param projectInfo
   * @param supervisorName
   * @param supervisorId
   */
  addFyp: function(projectTitle, projectId, projectInfo, supervisorName, supervisorId) {
    const query = `INSERT INTO fyp 
      (project_title, project_id, project_desc, supervisor_id, supervisor_name) 
      VALUES ('${projectTitle}', '${projectId}', '${projectInfo}', '${supervisorName}', '${supervisorId}');`
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
   * @param projectTitle
   * @param projectId
   * @param projectInfo
   * @param supervisorName
   * @param supervisorId
   */
  editFyp: function(projectTitle, projectId, projectInfo, supervisorName, supervisorId) {
    const query = `UPDATE fyp 
      SET project_title='${projectTitle}', project_id='${projectId}', project_desc='${projectInfo}', supervisor_id='${supervisorId}', supervisor_name='${supervisorName}'
      WHERE project_id='${projectId}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
  /**
   * @description delete fyp
   * @param projectId
   */
  deleteFyp: function(projectId) {
    const query = `DELETE FROM fyp 
      WHERE project_id='${projectId}';
    `
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
          .then(() => resolve())
          .catch((e) => reject(e))
    })
  },
}

module.exports = Project
