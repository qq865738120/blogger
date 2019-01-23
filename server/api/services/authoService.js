const pool = require('../model/db/connection')
const redis = require('../model/cache/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/authoEmun')

module.exports = {

  /*
  验证用户名密码
  参数：username 用户名
       passwd 密码
       callback 验证成功的回调函数
  返回：authoEmun枚举
  */
  async autho(username, passwd, callback) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length == 0) {
      return emun.USER_NAME_OR_PASSWD_ERR
    } else if (row[0].username == username && row[0].passwd == passwd) {
      callback()
      return emun.LOGIN_SUCCESS
    } else {
      return emun.USER_NAME_OR_PASSWD_ERR
    }
  }
}
