const mysql = require('mysql')
var pool  = mysql.createPool({
  connectionLimit: 10,
  host: 'example.org',
  user: 'bob',
  password: 'secret',
  database: 'my_db'
});
