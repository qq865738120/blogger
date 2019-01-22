const mysql = require('mysql')
const config = require('../../../../configs/index')

const pool = mysql.createPool(config.mysql);

module.exports = pool
