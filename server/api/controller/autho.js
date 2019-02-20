const emun = require('../common/authoEmun')
const service = require('../services/authoService')
var md5 = require('md5');

module.exports = {

  /**
  * @api {post} /login 用户登录
  * @apiDescription 用户登录
  * @apiName login
  * @apiGroup User
  * @apiParam {string} username 用户名
  * @apiParam {string} passwd 密码
  * @apiSuccess {Number} code 错误码 200：登录成功；201：用户名或者密码不正确；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '登陆成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '密码参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async login(req, res) {
    let result = {}
    if (!req.body.username) {
      result = emun.PAR_USER_NAME_ERR
    } else if (!req.body.passwd) {
      result = emun.PAR_PASSWD_ERR
    } else {
      result = await service.autho(req.body.username, req.body.passwd, () => {
        req.session.regenerate(function(err) {
            if (err){
              return res.json(emun.LOGIN_FAIL);
            } else {
              req.session.user = {
                username: req.body.username,
                passwd: md5(req.body.passwd)
              }
              return res.json(emun.LOGIN_SUCCESS);
            }
        });
      })
    }
    // res.json(result)
  },

  /**
  * @api {post} /registered 用户注册
  * @apiDescription 用户注册
  * @apiName registered
  * @apiGroup User
  * @apiParam {string} username 用户名
  * @apiParam {string} passwd 密码
  * @apiSuccess {Number} code 错误码 200：注册成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '注册成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '用户名已存在'
  * }
  * @apiVersion 1.0.0
  */
  async registered(req, res) {
    let result = {}
    if (!req.body.username) {
      result = emun.PAR_USER_NAME_ERR
    } else if (!req.body.passwd) {
      result = emun.PAR_PASSWD_ERR
    } else {
      result = await service.registered(req.body.username, req.body.passwd, () => {
        req.session.user = {
          username: req.body.username,
          passwd: md5(req.body.passwd)
        }
        console.log('sid', req.sessionID);
      })
    }
    res.json(result)
  },

  /**
  * @api {get} /check 检验用户登录
  * @apiDescription 检验用户登录
  * @apiName check
  * @apiGroup User
  * @apiSuccess {Number} code 错误码 200：验证通过；201：验证失败
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '验证通过'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '验证失败'
  * }
  * @apiVersion 1.0.0
  */
  async check(req, res) {
    let result = {}
    console.log('session', req.session);
    console.log('sid', req.sessionID);
    if (service.check(req)) {
      result = emun.CHECK_PASS
    } else {
      result = emun.CHECK_FAIL
    }
    res.json(result)
  },

  /**
  * @api {get} /logout 退出登陆
  * @apiDescription 退出登陆
  * @apiName logout
  * @apiGroup User
  * @apiSuccess {Number} code 错误码 200：注销成功；201：注销失败
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *   code: 200,
  *   msg: '注销成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '注销失败'
  * }
  * @apiVersion 1.0.0
  */
  logout(req, res) {
    req.session.destroy(function(err) {
      if (err) {
        res.json(emun.LOGOUT_FAIL)
      } else {
        res.json(emun.LOGOUT_SUCCESS)
      }
    })
  }

}
