const baseEmun = require('./baseEmun')

module.exports = {
  SUCCESS: baseEmun.SUCCESS,
  FAIL: baseEmun.FAIL,
  NOT_LOGIN: baseEmun.NOT_LOGIN,
  PAR_NAME_ERR: {
    code: 300,
    msg: 'name参数异常'
  },
  PAR_SUB_TITLE_ERR: {
    code: 300,
    msg: 'subTitle参数异常'
  },
  PAR_COVER_ERR: {
    code: 300,
    msg: 'cover参数异常'
  },
  PAR_CLASS_ID_ERR: {
    code: 300,
    msg: 'classId参数异常'
  },
  PAR_AUTHOR_ID_ERR: {
    code: 300,
    msg: 'authorId参数异常'
  },
  PAR_ERR: baseEmun.PAR_ERR
}
