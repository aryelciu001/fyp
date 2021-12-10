const mysql = require('mysql');
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: 3306,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});
module.exports = connection