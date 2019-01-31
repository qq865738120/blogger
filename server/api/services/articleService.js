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
  },

  /*
  查询文章信息
  参数：page Number 第几页（选传，默认0）
       rows Number 有几行（选传，默认20）
       isAsc Boolean 是否升序（选传，默认降序）
  返回：articleEmun枚举
  */
  async showArticleByCreateTime(page, rows, isAsc) {
    let row = await utils.dbQuery(pool, sql.showArticleByCreateTimeDescPage(page < 1 ? 1 : page, rows, isAsc))
    if (row.length == 0) {
      return emun.NOT_ARTICLE
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row
      return data
    }
  },

}
