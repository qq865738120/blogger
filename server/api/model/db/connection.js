const mysql = require('mysql')
const config = require('../../../../configs/index')

module.exports = mysql.createPool(config.mysql);
