const express = require('express')
const api = express.Router()

const home = require('./controller/home.js')
const autho = require('./controller/autho.js')

const apiMap = [
  {
    path: '/test',
    method: home.test
  },
  {
    path: '/login',
    method: autho.login
  }
]

for (let item of apiMap) {
  api.get(item.path, item.method)
}

module.exports = api
