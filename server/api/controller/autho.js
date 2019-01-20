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

  /*
  登陆接口
  */
  login(req, res) {
    let result = {}
    if (!req.body.username) {
      result = emun.PAR_USER_NAME_ERR
    } else if (!req.body.passwd) {
      result = emun.PAR_PASSWD_ERR
    } else {
      utils.dbQuery(pool, sql.showUserByUsername(req.body.username), (err, results, fields) => {
        if (results[0].username == req.body.username && results[0].passwd == req.body.passwd) {
          result = emun.LOGIN_SUCCESS
        } else {
          result = emun.USER_NAME_OR_PASSWD_ERR
        }
      })
    }
    res.json(result)
  }
}
