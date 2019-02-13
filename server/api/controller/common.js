const emun = require('../common/articleEmun')
const service = require('../services/commonService')

module.exports = {

  /**
  * @api {get} /classify 查询分类列表
  * @apiDescription 查询分类列表
  * @apiName select classify
  * @apiGroup Other
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '新增文章成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '新增文章失败'
  * }
  * @apiVersion 1.0.0
  */
  async showClassify(req, res) {
    let result = {}
    result = await service.showClassify()
    res.json(result)
  },

  /**
  * @api {get} /classify 查询分类列表
  * @apiDescription 查询分类列表
  * @apiName select classify
  * @apiGroup Other
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '新增文章成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '新增文章失败'
  * }
  * @apiVersion 1.0.0
  */
  async showClassify(req, res) {
    let result = {}
    result = await service.showClassify()
    res.json(result)
  }

}
