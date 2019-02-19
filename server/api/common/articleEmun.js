const baseEmun = require('./baseEmun')

module.exports = {
  FAIL: baseEmun.FAIL,
  SUCCESS: baseEmun.SUCCESS,
  PAR_ARTICLE_ID_ERR: {
    code: 300,
    msg: '文章id参数异常'
  },
  PAR_ARTICLE_TITLE_ERR: {
    code: 300,
    msg: 'title参数异常'
  },
  PAR_AUTHOR_ID_ERR: {
    code: 300,
    msg: 'authorId参数异常'
  },
  PAR_CLASS_ID_ERR: {
    code: 300,
    msg: 'classId参数异常'
  },
  PAR_CONTENT_ERR: {
    code: 300,
    msg: 'content参数异常'
  },
  PAR_STATUS_ERR: {
    code: 300,
    msg: 'status参数异常'
  },
  PAR_ILLUSTRATION_ERR: {
    code: 300,
    msg: 'illustration参数异常'
  },
  PAR_DESCRIBE_ERR: {
    code: 300,
    msg: 'describe参数异常'
  },
  ADD_SUCCESS: {
    code: 200,
    msg: '新增文章成功'
  },
  ADD_FAIL: {
    code: 201,
    msg: '新增文章失败'
  },
  ADD_FAIL_ID: {
    code: 201,
    msg: 'id重复'
  },
  NOT_ARTICLE: {
    code: 201,
    msg: '没有找到相关文章'
  },
  ARTICLE_SUCCESS: {
    code: 200,
    msg: '成功',
    data: ''
  },
  NOT_USER_ARTICLE: {
    code: 201,
    msg: '没有找到相关作者'
  },
  NOT_LOGIN: baseEmun.NOT_LOGIN,
  UPDATE_SUCCESS: {
    code: 200,
    msg: '更新成功'
  },
  UPDATE_FAIL: {
    code: 201,
    msg: '更新失败'
  },
  PAR_MODIFIER_ID_ERR: {
    code: 300,
    msg: 'modifierId参数异常'
  },
  NOT_ARTICLE_MODIFICATION: {
    code: 201,
    msg: '没有找到相关文章修改记录'
  },
  PAR_ERR: baseEmun.PAR_ERR,
  SELECT_ERR: baseEmun.SELECT_ERR
}
