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
  参数： values Array 数据，示例 [{id: '', bookId: '', title: ''}, {bookId: '', title: ''}] id为选传
  */
  async addChapters(values) {
    let va = values
    for (let i = 0; i < va.length; i++) {
      va[i].id = va[i].id ? va[i].id : utils.uuid()
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
  查询book表
  参数：id String 书id（选传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
       page Number 第几页（选传，默认第一页）
       row Number 一页多少行（选传，默认20行）
       isAsc Boolean 是否升序排列（选传，默认按创建时间降序）
  */
  async showBook(id, title, subTitle, classId, status, authorId, page, mrow, isAsc) {
    let row = await utils.dbQuery(pool, sql.showBook(id, title, subTitle, classId, status, authorId, page, mrow, isAsc))
    if (row.length == 0) {
      return emun.NOT_DATA
    } else {
      let data = emun.BOOK_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  统计book表查询个数
  参数：id String 书id（选传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
  */
  async showCountBook(id, title, subTitle, classId, status, authorId) {
    let row = await utils.dbQuery(pool, sql.showCountBook(id, title, subTitle, classId, status, authorId))
    if (row.length == 0) {
      return emun.NOT_DATA
    } else {
      let data = emun.BOOK_SUCCESS
      data.data = row[0]
      return data
    }
  },

  /*
  查询章节（id，bookId，title至少传一个参数）
  参数：id String 章节id（选传）
       bookId String 书id（选传）
       title String 书名（选传）
       isDesc Boolean 是否降序（选传，默认升序）
  */
  async showChapter(id, bookId, title, isDesc) {
    let row = await utils.dbQuery(pool, sql.showChapter(id, bookId, title, isDesc))
    if (row.length == 0) {
      return emun.NOT_DATA
    } else {
      let data = emun.BOOK_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  批量删除chapter表数据
  参数： values Array 数据，示例 [{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]
  */
  async deleteChapters(ids) {
    let row = await utils.dbQuery(pool, sql.deleteChapters(ids))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  批量增加书与文章的关系
  参数： values Array 数据，示例 [{bookId: '', articleId: '', sectionTitle: '', chapterId: ''}]
  */
  async addBookArticles(values) {
    let va = values
    for (let i = 0; i < va.length; i++) {
      va[i].id = utils.uuid()
      if (!va[i].bookId || !va[i].articleId || !va[i].sectionTitle || !va[i].chapterId) {
        return emun.PAR_ERR
      }
    }
    let row = await utils.dbQuery(pool, sql.insertBookArticles(va))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  批量删除book_article表数据
  参数：ids Array 章节id数组，示例['1', '2']
  */
  async deleteBookArticles(ids) {
    let row = await utils.dbQuery(pool, sql.deleteBookArticles(ids))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  },

  /*
  查询book_article表（至少传一个参数）
  参数：id String 章节id（选传）
       bookId String 书id（选传）
       articleId String 文章id（选传）
       sectionTitle String 标题（选传）
       chapterId String 章节id（选传）
       isDesc Boolean 是否降序（选传，默认升序）
  */
  async showBookArticle(id, bookId, articleId, sectionTitle, chapterId, isDesc) {
    let row = await utils.dbQuery(pool, sql.showBookArticle(id, bookId, articleId, sectionTitle, chapterId, isDesc))
    if (row.length == 0) {
      return emun.NOT_DATA
    } else {
      let data = emun.BOOK_SUCCESS
      data.data = row
      return data
    }
  },

  /*
  删除book_article表中冗余数据
  参数： bookId String 书id
  */
  async deleteRedundanceBookArticle(bookId) {
    let ids = []
    let row1 = await utils.dbQuery(pool, sql.showBookArticle('', bookId))
    if (row1.length == 0) {
      return emun.NOT_REDUNDANCE
    } else {
      for (let item of row1) {
        let row2 = await utils.dbQuery(pool, sql.showChapter(item.chapter_id))
        if (row2.length == 0) {
          ids.push(item.id)
        }
      }
    }
    if (ids.length > 0) {
      let row3 = await utils.dbQuery(pool, sql.deleteBookArticles(ids))
      if (row3.fieldCount == 0) {
        return emun.SUCCESS
      } else {
        return emun.FAIL
      }
    }
    return emun.SUCCESS
  }

}
