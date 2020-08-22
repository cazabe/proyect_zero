const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'clave1234',
  database: 'proyect_zero'
});

module.exports = con;