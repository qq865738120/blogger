module.exports = {

  /*
  数据库查询方法封装
  */
  dbQuery(pool, sql) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, (err, results, fields) => {
            if (err) {
              reject(err)
            } else {
              resolve(results)
            }
            connection.release();
          })
        }
      })
    })
  }

}
