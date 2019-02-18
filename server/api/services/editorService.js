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
       describe String 文章描述
  返回：articleEmun枚举
  */
  async addArticle(id, title, authorId, classId, content, status, illustration, keyWords, describe) {
    let rows = await utils.dbQuery(pool, sql.showArticleById(id))
    if (rows.length > 0) {
      return emun.ADD_FAIL_ID
    }
    let dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let row = await utils.dbQuery(pool, sql.insertArticle(id, title, authorId, dateTime, dateTime, classId, content, status, illustration, keyWords, describe))
    if (row.fieldCount == 0) {
      await utils.dbQuery(pool, sql.insertUserArticle(utils.uuid(), authorId, id))
      return emun.ADD_SUCCESS
    } else {
      return emun.ADD_FAIL
    }
  },

  /*
  更新article表
  参数：id String 主键id(必传)
       title String 标题（选传）
       authorId String 作者（用户）id（选传）
       createdDate Date 创建时间（选传）
       lastDate Date 最后修改时间（选传）
       watchCount String 浏览次数（选传）
       classId String 分类id（选传）
       modifyCount String 修改次数（选传）
       content String 文章内容（选传）
       status Number 文章状态（选传）
       illustration String 文章插图（选传）
       keyWords String 关键词（选传）
       describe String 文章描述（选传）
  */
  async updateArticle(id, title, authorId, createdDate, lastDate, watchCount, classId, modifyCount, content, status, illustration, keyWords, describe) {
    let row = await utils.dbQuery(pool, sql.updateArticle(id, title, authorId, createdDate, lastDate, watchCount, classId, modifyCount, content, status, illustration, keyWords, describe))
    if (row.fieldCount == 0) {
      return emun.UPDATE_SUCCESS
    } else {
      return emun.UPDATE_FAIL
    }
  },

  /*
  新增文章修改记录
  参数：modifierId String 修改人id
       content String 内容
  */
  async addArticleModification(modifierId, content, articleId) {
    let row = await utils.dbQuery(pool, sql.insertArticleModification(utils.uuid(), modifierId, content, articleId))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  查找文章修改记录（三个参数至少传一个）
  参数：modifierId String 修改人id
       content String 内容
  */
  async showArticleModification(id, modifierId, articleId) {
    let row = await utils.dbQuery(pool, sql.showArticleModification(id, modifierId, articleId))
    if (row.length == 0) {
      return emun.NOT_ARTICLE_MODIFICATION
    } else {
      let data = emun.ARTICLE_SUCCESS
      data.data = row
      return data
    }
  },

}
