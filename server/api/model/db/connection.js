const mysql = require('mysql')
const config = require('')

var pool  = mysql.createPool({
  // connectionLimit: 20,
  // host: 'example.org',
  // user: 'bob',
  // password: 'secret',
  // database: 'my_db'
});
