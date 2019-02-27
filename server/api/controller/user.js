const emun = require('../common/userEmun')
const service = require('../services/userService')
var md5 = require('md5');

module.exports = {

  /**
  * @api {get} /user/info 查询用户信息
  * @apiDescription 查询用户信息，需要先登录获取用户权限
  * @apiName userInfo
  * @apiGroup User
  * @apiSuccess {Number} code 错误码 200：成功；301：没有登录
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 301,
  *   msg: '没有登录'
  * }
  * @apiVersion 1.0.0
  */
  async userInfo(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else {
      result = await service.showUserInfo(req.session.user.username)
    }
    res.json(result)
  },

  /**
  * @api {post} /user/update 更新用户信息
  * @apiDescription 更新用户信息，需要先登录获取用户权限
  * @apiName userUpdate
  * @apiGroup User
  * @apiParam {Object} parm 需要更新的用户信息
  * @apiSuccess {Number} code 错误码 200：成功；301：没有登录
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Object} data 数据
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '更新成功',
  *  data: ''
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 301,
  *   msg: '没有登录'
  * }
  * @apiVersion 1.0.0
  */
  async userUpdate(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else {
      req.body.username = req.session.user.username
      result = await service.updateUserInfo(req.body)
    }
    res.json(result)
  },

  /**
  * @api {get} /user/info/id 使用id查询用户信息
  * @apiDescription 查询用户信息
  * @apiName userInfo by id
  * @apiGroup User
  * @apiParam {string} id 用户id
  * @apiSuccess {Number} code 错误码 200：成功；300：参数异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Object} data 数据
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功',
  *  data: ''
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async userInfoById(req, res) {
    let result = {}
    if (!req.query.id) {
      result = emun.UPDATE_ERR
    } else {
      result = await service.showUserInfoById(req.query.id)
    }
    res.json(result)
  },

  /**
  * @api {post} /article/collection 收藏文章
  * @apiDescription 收藏文章接口，需要有登录权限
  * @apiName collection article
  * @apiGroup User
  * @apiParam {string} userId 用户id
  * @apiParam {string} collectionId 文章id/书籍id
  * @apiParam {Number} type 收藏类型0表示文章，1表示书籍（选传，默认0）
  * @apiSuccess {Number} code 错误码 200：成功；300：参数异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async addCollectionArticle(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.userId) {
      result = emun.PR_USER_ID_ERR
    } else if (!req.body.collectionId) {
      result = emun.PR_COLLECTION_ID_ERR
    } else {
      result = await service.addCollectionArticle(req.body.userId, req.body.collectionId, req.body.type)
    }
    res.json(result)
  },

  /**
  * @api {get} /article/collection 获取收藏
  * @apiDescription 获取收藏，需要有登录权限
  * @apiName show collection
  * @apiGroup User
  * @apiParam {string} id 收藏id（选传）
  * @apiParam {string} userId 用户id（选传）
  * @apiParam {string} collectionId 文章id/书籍id（选传）
  * @apiParam {Number} type 收藏类型0表示文章，1表示书籍（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：参数异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Array} data 数据
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功',
  *  data: []
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async showCollectionArticle(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else {
      result = await service.showCollectionArticle(req.query.id, req.query.userId, req.query.collectionId, req.query.type)
    }
    res.json(result)
  },

  /**
  * @api {post} /article/collection/delete 取消收藏
  * @apiDescription 取消收藏的接口，需要有登录权限
  * @apiName cancel collection
  * @apiGroup User
  * @apiParam {string} collectionId 文章id/书籍id（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：参数异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: 'collectionId参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async deleteCollectionArticle(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.collectionId) {
      result = emun.PR_COLLECTION_ID_ERR
    } else {
      let info = await service.showUserInfo(req.session.user.username)
      if (info.code == 200) {
        result = await service.deleteCollectionArticle('', info.data.id, req.body.collectionId)
      } else {
        result = emun.NOT_LOGIN
      }
    }
    res.json(result)
  },

  /**
  * @api {get} /user/collection 获取用户所有收藏列表
  * @apiDescription 获取用户所有收藏列表（需要登录）
  * @apiName show collection article
  * @apiGroup User
  * @apiParam {string} id 收藏id（选传）
  * @apiParam {string} userId 用户id（选传）
  * @apiParam {string} collectionId 文章id（选传）
  * @apiParam {Number} type 收藏类型0表示文章，1表示书籍（选传）
  * @apiSuccess {Number} code 错误码 200：成功；201：没有数据
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Array} data 数据
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功',
  *  data: []
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '没有数据'
  * }
  * @apiVersion 1.0.0
  */
  async showUserCollection(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else {
      result = await service.showUserCollection(req.query.userId)
    }
    res.json(result)
  },

}
