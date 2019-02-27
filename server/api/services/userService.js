const pool = require('../model/db/connection')
const redis = require('../model/cache/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/userEmun')
const md5 = require('md5');

module.exports = {

  /*
  查询用户信息
  参数：username 用户名
  返回：userEmun枚举
  */
  async showUserInfo(username) {
    let row = await utils.dbQuery(pool, sql.showUserByUsername(username))
    if (row.length == 0) {
      return emun.NOT_USESR
    } else {
      let data = emun.USER_SUCCESS
      data.data = row[0]
      return data
    }
  },

  /*
  更新用户信息
  参数：parm Object { username: 'test', passwd: 'test', nickname: 'lalala' }，除username其他选传一个
  返回：userEmun枚举
  */
  async updateUserInfo(parm) {
    if (!parm.passwd && !parm.nickname && !parm.avatar && !parm.signature) {
      return emun.UPDATE_ERR
    }
    let pw = parm.passwd ? md5(parm.passwd) : ''
    let row = await utils.dbQuery(pool, sql.updateUser(parm.username, pw, parm.nickname, parm.avatar, parm.signature))
    if (row.fieldCount != 0) {
      return emun.UPDATE_FAIL
    } else {
      return emun.UPDATE_SUCCESS
    }
  },

  /*
  查询用户信息，通过id
  参数：id 用户id
  返回：userEmun枚举
  */
  async showUserInfoById(id) {
    let row = await utils.dbQuery(pool, sql.showUserById(id))
    if (row.length == 0) {
      return emun.NOT_USESR
    } else {
      let data = emun.USER_SUCCESS
      data.data = row[0]
      return data
    }
  },

  /*
  新增文章收藏
  参数：userId String 用户id
       collectionId String 收藏的文章id
       type Number 收藏类型0表示文章，1表示书籍（选传，默认0）
  */
  async addCollectionArticle(userId, collectionId, type) {
    let row = await utils.dbQuery(pool, sql.insertUserCollectionArticle(utils.uuid(), userId, collectionId, type))
    if (row.fieldCount != 0) {
      return emun.FAIL
    } else {
      return emun.SUCCESS
    }
  },

  /*
  查询user_collection_article表
  参数： id String 主键id（选传）
        userId String 用户id（选传）
        collectionId String 收藏的文章id（选传）
        type Number 收藏类型0表示文章，1表示书籍（选传）
  */
  async showCollectionArticle(id, userId, collectionId, type) {
    let row = await utils.dbQuery(pool, sql.showUserCollectionArticle(id, userId, collectionId, type))
    if (row.length == 0) {
      return emun.NOT_COLLECTION
    } else {
      let data = emun.USER_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  删除文章收藏
  参数： id String 主键id（选传）
        userId String 用户id（选传）
        collectionId String 收藏的文章id（选传）
  */
  async deleteCollectionArticle(id, userId, collectionId) {
    let row = await utils.dbQuery(pool, sql.deleteUserCollectionArticle(id, userId, collectionId))
    if (row.fieldCount != 0) {
      return emun.FAIL
    } else {
      return emun.SUCCESS
    }
  },

  /*
  展示用户所有收藏
  参数：userId String 用户id
  */
  async showUserCollection(userId) {
    let row1 = await utils.dbQuery(pool, sql.showUserCollectionArticle('', userId, '', ''))
    let articleIds = []
    let bookIds = []
    for (let item of row1) {
      if (item.type == 0) {
        articleIds.push(item.collection_id)
      } else if (item.type == 1) {
        bookIds.push(item.collection_id)
      }
    }
    let row2 = '';
    if (articleIds.length > 0) {
      row2 = await utils.dbQuery(pool, sql.showArticles(articleIds))
    }
    let row3 = '';
    if (bookIds.length > 0) {
      row3 = await utils.dbQuery(pool, sql.showBooks(bookIds))
    }
    if (row2.length <= 0 && row3.length <= 0) {
      return emun.NOT_COLLECTION
    } else {
      let data = emun.USER_SUCCESS
      row2.push(row3)
      data.data = row2
      return data
    }
  },

}
