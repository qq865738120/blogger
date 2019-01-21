const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../../utils')

const emun = {
  PAR_USER_NAME_ERR: {
    code: 300,
    msg: '用户名参数异常'
  },
  PAR_PASSWD_ERR: {
    code: 300,
    msg: '密码参数异常'
  },
  LOGIN_SUCCESS: {
    code: 200,
    msg: '登陆成功'
  },
  USER_NAME_OR_PASSWD_ERR: {
    code: 201,
    msg: '用户名或密码不正确'
  }
}

module.exports = {

  /**
  * @api {get} /login 用户登录
  * @apiDescription 用户登录
  * @apiName login
  * @apiGroup User
  * @apiParam {string} username 用户名
  * @apiParam {string} passwd 密码
  * @apiSuccess {Number} code 错误码 200：登录成功；201：用户名或者密码不正确；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '登陆成功'
  *}
  * @apiErrorExample Error:
  * { code: 300, msg: '密码参数异常' }
  * @apiVersion 1.0.0
  */
  async login(req, res) {
    let result = {}
    if (!req.body.username) {
      result = emun.PAR_USER_NAME_ERR
    } else if (!req.body.passwd) {
      result = emun.PAR_PASSWD_ERR
    } else {
      let row = await utils.dbQuery(pool, sql.showUserByUsername(req.body.username))
      if (row.length == 0) {
        result = emun.USER_NAME_OR_PASSWD_ERR
      } else if (row[0].username == req.body.username && row[0].passwd == req.body.passwd) {
        result = emun.LOGIN_SUCCESS
      } else {
        result = emun.USER_NAME_OR_PASSWD_ERR
      }
    }
    res.json(result)
  }
}
