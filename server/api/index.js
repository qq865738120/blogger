const express = require('express')
const apiv1 = express.Router()

const home = require('./controller/home.js')
const autho = require('./controller/autho.js')
const user = require('./controller/user.js')
const sts = require('./controller/STS.js')
const editor = require('./controller/editor.js')
const common = require('./controller/common.js')

const apiMap = [
  {
    path: '/login',
    type: 'post',
    method: autho.login
  },
  {
    path: '/logout',
    type: 'get',
    method: autho.logout
  },
  {
    path: '/registered',
    type: 'post',
    method: autho.registered
  },
  {
    path: '/check',
    type: 'get',
    method: autho.check
  },
  {
    path: '/user/info',
    type: 'get',
    method: user.userInfo
  },
  {
    path: '/user/update',
    type: 'post',
    method: user.userUpdate
  },
  {
    path: '/file/sts',
    type: 'post',
    method: sts.getScope
  },
  {
    path: '/article/id',
    type: 'get',
    method: home.getArticleById
  },
  {
    path: '/article/createtime',
    type: 'get',
    method: home.getArticleByCreateTime
  },
  {
    path: '/article/add',
    type: 'post',
    method: editor.addArticle
  },
  {
    path: '/classify',
    type: 'get',
    method: common.showClassify
  },
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
