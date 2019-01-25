const authoEmun = require('./authoEmun')

module.exports = {
  PAR_USER_NAME_ERR: authoEmun.PAR_USER_NAME_ERR,
  NOT_LOGIN: {
    code: 201,
    msg: '没有登录'
  },
  USER_SUCCESS: {
    code: 200,
    msg: '成功',
    data: ''
  },
  NOT_USESR: {
    code: 201,
    msg: '用户不存在'
  }
}
