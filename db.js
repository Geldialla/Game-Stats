const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sql8.freesqldatabase.com',
  user: 'sql8770157',
  password: '5CJdpXuL5a', // ← update this when it appears
  database: 'sql8770157'
});

module.exports = pool.promise();
