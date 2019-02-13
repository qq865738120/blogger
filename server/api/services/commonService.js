const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')
const emun = require('../common/commonEmun')
const md5 = require('md5');
const moment = require('moment')

module.exports = {

  /*
  新增文章

  返回：commonEmun枚举
  */
  async showClassify() {
    let row = await utils.dbQuery(pool, sql.showClassify())
    if (row.length != 0) {
      let result = emun.CLASSIFY_SUCCESS;
      result.data = row
      return result
    } else {
      return emun.CLASSIFY_FAIL
    }
  }

}
