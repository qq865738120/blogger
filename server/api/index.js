const express = require('express')
const apiv1 = express.Router()

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
    case 'get': apiv1.get(item.path, item.method); break;
    case 'post': apiv1.post(item.path, item.method); break;
  }
}

module.exports = {
  apiv1
}
