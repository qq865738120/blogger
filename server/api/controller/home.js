const emun = require('../common/articleEmun')
const service = require('../services/articleService')

module.exports = {

  /**
  * @api {get} /article/id 文章查询通过id
  * @apiDescription 文章查询通过id
  * @apiName show article by id
  * @apiGroup Article
  * @apiParam {string} id 文章id
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
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
  async getArticleById(req, res) {
    let result = {}
    if (!req.query.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      result = await service.showArticleById(req.query.id)
    }
    res.json(result)
  },

  /**
  * @api {get} /article/createtime 文章查询通过create_time
  * @apiDescription 文章查询通过create_time，升序或者降序排了，并且分页处理
  * @apiName show article by createtime
  * @apiGroup Article
  * @apiParam {Number} page 第几页（必传）
  * @apiParam {Number} row 该页多少行（选传，默认20）
  * @apiParam {Boolean} asc 是否升序排列（选传，默认降序）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Object} data 数据（没数据返回空）
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
  async getArticleByCreateTime(req, res) {
    let result = {}
    if (!req.query.page) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      let row = req.query.row ? parseInt(req.query.row) : 20;
      let asc = req.query.asc ? ( req.query.asc == 'true' ? true : false ) : false
      console.log('req.query', req.query);
      console.log('row', row);
      console.log('asc', asc);
      result = await service.showArticleByCreateTime(req.query.page, row, asc)
    }
    res.json(result)
  }

}
