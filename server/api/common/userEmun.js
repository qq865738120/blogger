const authoEmun = require('./authoEmun')
const baseEmun = require('./baseEmun')

module.exports = {
  PAR_USER_NAME_ERR: authoEmun.PAR_USER_NAME_ERR,
  NOT_LOGIN: baseEmun.NOT_LOGIN,
  FAIL: baseEmun.FAIL,
  SUCCESS: baseEmun.SUCCESS,
  USER_SUCCESS: {
    code: 200,
    msg: '成功',
    data: ''
  },
  NOT_USESR: {
    code: 201,
    msg: '用户不存在'
  },
  UPDATE_FAIL: {
    code: 201,
    msg: '更新失败'
  },
  UPDATE_SUCCESS: {
    code: 200,
    msg: '更新成功'
  },
  UPDATE_ERR: {
    code: 300,
    msg: '参数异常'
  },
  PR_USER_ID_ERR: {
    code: 300,
    msg: 'userId参数异常'
  },
  PR_COLLECTION_ID_ERR: {
    code: 300,
    msg: 'collectionId参数异常'
  },
  NOT_COLLECTION: {
    code: 201,
    msg: '没有收藏'
  }
}
