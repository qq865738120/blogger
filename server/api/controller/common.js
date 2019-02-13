const emun = require('../common/commonEmun')
const service = require('../services/commonService')
const utils = require('../common/utils')

module.exports = {

  /**
  * @api {get} /classify 查询分类列表
  * @apiDescription 查询分类列表
  * @apiName select classify
  * @apiGroup Other
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
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
  *   msg: '失败'
  * }
  * @apiVersion 1.0.0
  */
  async showClassify(req, res) {
    let result = {}
    result = await service.showClassify()
    res.json(result)
  },

  /**
  * @api {get} /uuid 获取uuid
  * @apiDescription 获取uuid
  * @apiName get uuid
  * @apiGroup Other
  * @apiParam {string} length 长度（选传）
  * @apiParam {string} radixs 进制（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {String} data 数据
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *  data: ''
  *}
  * @apiVersion 1.0.0
  */
  async getUUID(req, res) {
    let result = {}
    result = emun.CLASSIFY_SUCCESS;
    result.data = utils.uuid(req.query.length, req.query.radixs)
    res.json(result)
  }

}
