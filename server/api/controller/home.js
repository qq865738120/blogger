const emun = require('../common/articleEmun')
const service = require('../services/authoService')

module.exports = {

  /**
  * @api {get} /article/id 文章查询通过id
  * @apiDescription 文章查询通过id
  * @apiName login
  * @apiGroup User
  * @apiParam {string} id 文章id
  * @apiSuccess {Number} code 错误码 200：登录成功；300：传参异常
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
  *   msg: '密码参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async getArticleById(req, res) {
    let result = {}
    if (!req.params.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      result = await service.showArticleById(req.params.id)
    }
    res.json(result)
  }

}
