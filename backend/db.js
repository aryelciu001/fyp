const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'fyp_db',
  port: 3306,
  user: 'root',
  password: 'zP8c4eE8OcQX2Q6H',
  database: 'fyp_lists_project'
});
module.exports = connection