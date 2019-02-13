const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/articleEmun')
const md5 = require('md5');
const moment = require('moment')

module.exports = {

  /*
  新增文章
  参数：id String 主键id
       title String 标题
       authorId String 作者（用户）id
       classId String 分类id
       content String 文章内容
       status Number 文章状态
       illustration String 文章插图
       keyWords String 关键词
  返回：articleEmun枚举
  */
  async addArticle(id, title, authorId, classId, content, status, illustration, keyWords) {
    let dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let row = await utils.dbQuery(pool, sql.insertArticle(id, title, authorId, dateTime, dateTime, classId, content, status, illustration, keyWords))
    if (row.fieldCount == 0) {
      return emun.ADD_SUCCESS
    } else {
      return emun.ADD_FAIL
    }
  }

}
