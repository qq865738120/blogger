const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/articleEmun')

module.exports = {

  /*
  查询文章信息
  参数：id 用户名
  返回：articleEmun枚举
  */
  async showArticleById(id) {
    let row = await utils.dbQuery(pool, sql.showArticleById(id))
    if (row.length == 0) {
      return emun.NOT_ARTICLE
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row[0]
      return data
    }
  }

}
