const express = require('express')
const api = express.Router()

const home = require('./controller/home.js')
const autho = require('./controller/autho.js')

const apiMap = [
  {
    path: '/test',
    type: 'get',
    method: home.test
  },
  {
    path: '/login',
    type: 'post',
    method: autho.login
  }
]

for (let item of apiMap) {
  switch (item.type) {
    case 'get': api.get(item.path, item.method); break;
    case 'post': api.post(item.path, item.method); break;
  }
}

module.exports = api
