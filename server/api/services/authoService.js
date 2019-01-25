const pool = require('../model/db/connection')
const redis = require('../model/cache/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/authoEmun')
const md5 = require('md5');

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
    } else if (row[0].username == username && row[0].passwd == md5(passwd)) {
      callback()
      return emun.LOGIN_SUCCESS
    } else {
      return emun.USER_NAME_OR_PASSWD_ERR
    }
  },

  /*
  校验用户是否处于登录状态
  参数：req request对象
  返回：通过返回true，不通过返回false
  */
  check(req) {
    return req.session.user ? true : false
  },

  /*
  用户注册
  参数：username 用户名
       passwd 密码
       callback 注册成功回调
  返回：authoEmun枚举
  */
  async registered(username, passwd, callback) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length != 0) {
      return emun.USERNAME_REPEAT
    }
    row = await utils.dbQuery(pool, sql.insertUser(username, md5(passwd)))
    callback();
    return emun.REGISTERED_SUCCESS
  }

}
