const baseEmun = require('./baseEmun')

module.exports = {
  SUCCESS: baseEmun.SUCCESS,
  FAIL: baseEmun.FAIL,
  NOT_LOGIN: baseEmun.NOT_LOGIN,
  PAR_ID_ERR: {
    code: 300,
    msg: 'id参数异常'
  },
  PAR_IDS_ERR: {
    code: 300,
    msg: 'ids参数异常'
  },
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
  PAR_VALUES_ERR: {
    code: 300,
    msg: '参数异常'
  },
  PAR_ERR: baseEmun.PAR_ERR,
  NOT_DATA: baseEmun.NOT_DATA,
  BOOK_SUCCESS: {
    code: 200,
    msg: '成功',
    data: ''
  },
  NOT_REDUNDANCE: {
    code: 300,
    msg: '没有冗余数据'
  }
}
