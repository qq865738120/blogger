const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/authoEmun')
const md5 = require('md5');

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
  返回：authoEmun枚举
  */
  async addArticle(id, title, authorId, classId, content, status, illustration) {
    let row = await utils.dbQuery(pool, sql.insertArticle(id, title, authorId, new Date(), new Date(), classId, content, status, illustration))
    // if (row.length != 0) {
    //   return emun.USERNAME_REPEAT
    // }
    console.log('row', row);
    return emun.REGISTERED_SUCCESS
  }

}
