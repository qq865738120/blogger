const base = require('./base-config.js')
const dev = require('./dev-config.js')
const pro = require('./pro-config.js')
const merge = require('webpack-merge')

const NODE_ENV = 'dev' // dev 测试环境，pro 生产环境

let config = {}
if (NODE_ENV == 'dev') {
  config = merge(base, dev)
} else if (NODE_ENV == 'pro') {
  config = merge(base, pro)
}

module.exports = config
