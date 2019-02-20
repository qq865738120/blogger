const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/bookEmun')

module.exports = {

  /*
  新增book
  参数：id String 主键id
       title String 书名
       subTitle String 附标题
       cover String 封面
       classId String 类别id
       authorId String 作者id
  */
  async addBook(id, title, subTitle, cover, classId, authorId) {
    let row = await utils.dbQuery(pool, sql.insertBook(id, title, subTitle, cover, classId, 1, authorId))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  批量增加章节
  参数： values Array 数据，示例 [{bookId: '', title: ''}, {bookId: '', title: ''}]
  */
  async addChapters(values) {
    let va = values
    for (let i = 0; i < va.length; i++) {
      va[i].id = utils.uuid()
      if (!va[i].bookId || !va[i].title) {
        return emun.PAR_ERR
      }
    }
    let row = await utils.dbQuery(pool, sql.insertChapters(va))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  更新book
  参数：id String 书id（必传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       cover String 封面（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
  */
  async updateBook(id, title, subTitle, cover, classId, status, authorId) {
    let row = await utils.dbQuery(pool, sql.updateBook(id, title, subTitle, cover, classId, status, authorId))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  批量更新chapter表
  参数： values Array 数据，示例 [{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]
  */
  async updateChapters(values) {
    let row = await utils.dbQuery(pool, sql.updateChapters(values))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  查询book表（至少传一个参数）
  参数：id String 书id（选传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
  */
  async showBook(id, title, subTitle, classId, status, authorId) {
    let row = await utils.dbQuery(pool, sql.updateBook(id, title, subTitle, classId, status, authorId))
    if (row.length == 0) {
      return emun.NOT_DATA
    } else {
      let data = emun.BOOK_SUCCESS
      data.data = row
      return data
    }
  },

}
