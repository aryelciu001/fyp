const { mysqlQuery } = require('../utils/mysqlQuery')

const Project = {
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
  getFyp: function() {
    const query = `SELECT * FROM fyp;`
    return new Promise((resolve, reject) => {
      mysqlQuery(query)
        .then((fyp) => resolve(fyp))
        .catch((e) => reject(e))
    })
  }
}

module.exports = Project