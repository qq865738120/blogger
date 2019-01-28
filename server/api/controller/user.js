const emun = require('../common/userEmun')
const service = require('../services/userService')
var md5 = require('md5');

module.exports = {

  /**
  * @api {get} /user/info 查询用户信息
  * @apiDescription 查询用户信息
  * @apiName userInfo
  * @apiGroup User
  * @apiSuccess {Number} code 错误码 200：成功；201：没有登录
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
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
  * @apiDescription 更新用户信息
  * @apiName userUpdate
  * @apiGroup User
  * @apiSuccess {Number} code 错误码 200：成功；201：没有登录
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '更新成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
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

}
