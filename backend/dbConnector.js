const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'clave1234',
  database: 'proyect_zero'
});

module.exports = con;

// con.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

// const rol = { nombre: 'Administrador' };
// con.query('INSERT INTO rol SET ?', rol, (err, res) => {
//   if(err) throw err;
//   console.log('Last insert ID:', res.id);
// });

// con.query('SELECT * FROM usuario', (err,rows) => {
//     if(err) throw err;
  
//     console.log('Data received from Db:');
//     console.log(rows);
// });

// con.end((err) => {

// });