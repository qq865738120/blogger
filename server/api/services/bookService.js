const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/bookEmun')

module.exports = {

  /*
  新增book
  参数：title String 书名
       subTitle String 附标题
       cover String 封面
       classId String 类别id
       authorId String 作者id
  */
  async addBook(title, subTitle, cover, classId, authorId) {
    let row = await utils.dbQuery(pool, sql.insertBook(utils.uuid(), title, subTitle, cover, classId, 1, authorId))
    if (row.fieldCount == 0) {
      return emun.SUCCESS
    } else {
      return emun.FAIL
    }
  }

}
