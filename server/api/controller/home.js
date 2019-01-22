const pool = require('../model/db/connection')
const sql = require('../model/db/sql')
const utils = require('../common/utils')

module.exports = {
  async test(req, res) {
    let row = await utils.dbQuery(pool, 'select * from user')
    res.json(row)
  }
}
