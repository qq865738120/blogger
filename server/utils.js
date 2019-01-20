module.exports = {

  /*
  数据库查询方法封装
  */
  dbQuery(pool, sql, callback) {
    pool.getConnection((err, connection) => {
      if (err) throw err
      connection.query(sql, (err, results, fields) => {
        connection.release();
        callback(err, results, fields);
      })
    })
  }
}
