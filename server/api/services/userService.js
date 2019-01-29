const pool = require('../model/db/connection')
const redis = require('../model/cache/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/userEmun')
const md5 = require('md5');

module.exports = {

  /*
  查询用户信息
  参数：username 用户名
  返回：userEmun枚举
  */
  async showUserInfo(username) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length == 0) {
      return emun.NOT_USESR
    } else {
      let data = emun.USER_SUCCESS
      data.data = row[0]
      return data
    }
  },

  /*
  更新用户信息
  参数：parm Object { username: 'test', passwd: 'test', nickname: 'lalala' }，除username其他选传一个
  返回：userEmun枚举
  */
  async updateUserInfo(parm) {
    if (!parm.passwd && !parm.nickname && !parm.avatar && !parm.signature) {
      return emun.UPDATE_ERR
    }
    let pw = parm.passwd ? md5(parm.passwd) : ''
    let row = await utils.dbQuery(pool, sql.updateUser(parm.username, pw, parm.nickname, parm.avatar, parm.signature))
    if (row.fieldCount != 0) {
      return emun.UPDATE_FAIL
    } else {
      return emun.UPDATE_SUCCESS
    }
  }

}
