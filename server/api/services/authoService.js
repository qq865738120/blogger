const pool = require('../model/db/connection')
const redis = require('../model/cache/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/authoEmun')

module.exports = {
  async login(username, passwd, req) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length == 0) {
      return emun.USER_NAME_OR_PASSWD_ERR
    } else if (row[0].username == username && row[0].passwd == passwd) {
      req.session.user = {
        username,
        passwd
      }
      console.log('sid', req.sessionID);
      return emun.LOGIN_SUCCESS
    } else {
      return emun.USER_NAME_OR_PASSWD_ERR
    }
  }
}
