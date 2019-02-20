const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/authoEmun')
const md5 = require('md5');

module.exports = {

  /*
  验证用户名密码
  参数：req 请求对象
       res 响应对象
       username 用户名
       passwd 密码
  */
  async autho(req, res, username, passwd) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length == 0) {
      res.json(emun.USER_NAME_OR_PASSWD_ERR)
    } else if (row[0].username == username && row[0].passwd == md5(passwd)) {
      req.session.regenerate(function(err) {
        if (err){
          res.json(emun.LOGIN_FAIL);
        } else {
          req.session.user = {
            username: req.body.username,
            passwd: md5(req.body.passwd)
          }
          res.json(emun.LOGIN_SUCCESS);
        }
      });
    } else {
      res.json(emun.USER_NAME_OR_PASSWD_ERR)
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
  参数：req 请求对象
       res 响应对象
       username 用户名
       passwd 密码
  返回：authoEmun枚举
  */
  async registered(req, res, username, passwd) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length != 0) {
      res.json(emun.USERNAME_REPEAT)
    }
    row = await utils.dbQuery(pool, sql.insertUser(username, md5(passwd)))
    req.session.regenerate(function(err) {
      if (err){
        res.json(emun.LOGIN_FAIL);
      } else {
        req.session.user = {
          username: req.body.username,
          passwd: md5(req.body.passwd)
        }
        res.json(emun.REGISTERED_SUCCESS);
      }
    });
  }

}
