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
      return emun.NOT_USER_ARTICLE
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
       status Number 文章状态（选传）
       isShowAuthor Boolean 是否需要展示作者昵称（选传，默认不展示）
       authorId String 作者id
  返回：articleEmun枚举
  */
  async showArticleByCreateTime(page, rows, isAsc, status, isShowAuthor, authorId) {
    let row = await utils.dbQuery(pool, sql.showArticleByCreateTimeDescPage(page < 1 ? 1 : page, rows, isAsc, status, authorId))
    if (row.length == 0) {
      return emun.NOT_ARTICLE
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row
      if (isShowAuthor) {
        for (let i = 0; i < row.length; i++) {
          let authorStr = ''
          let rows = await utils.dbQuery(pool, sql.showAuthorByArticleId(row[i].id))
          for (let it of rows) {
            authorStr += (it.nickname + ',')
          }
          data.data[i].authorStr = authorStr.substring(0, authorStr.length - 1)
        }
      }
      return data
    }
  },

  /*
  查询user_article表
  参数： userId String 用户id（选传）
        articleId String 文章id（选传）
  */
  async showUserArticle(userId, articleId) {
    let row = await utils.dbQuery(pool, sql.showUserArticle(userId, articleId))
    if (row.length == 0) {
      return emun.NOT_USER_ARTICLE
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  查询指定文章的所有作者/修改者
  参数： articleId String 文章id（必传）
  */
  async showAuthorByArticleId(articleId) {
    let row = await utils.dbQuery(pool, sql.showAuthorByArticleId(articleId))
    if (row.length == 0) {
      return emun.NOT_USER_ARTICLE
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  根据指定条件查询文章个数
  参数：authorId String 作者id（选传）
       classId String 类型id（选传）
       title String 标题，使用模糊匹配（选传）
       keywords String 关键字，使用模糊匹配（选传）
  */
  async showCountArticle(authorId, classId, title, keywords) {
    let row = await utils.dbQuery(pool, sql.showCountArticle(authorId, classId, title, keywords))
    if (row.length == 0) {
      return emun.SELECT_ERR
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row[0]
      return data
    }
  },

}
