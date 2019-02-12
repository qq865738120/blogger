const emun = require('../common/articleEmun')
const service = require('../services/editorService')

module.exports = {

  /**
  * @api {put} /article/add 新增文章
  * @apiDescription 增加新的文章
  * @apiName add article
  * @apiGroup Article
  * @apiParam {string} id 文章id（必传）
  * @apiParam {string} title 文章标题（必传）
  * @apiParam {string} authorId 作者id（必传）
  * @apiParam {string} classId 分类id（必传）
  * @apiParam {string} content 内容（必传）
  * @apiParam {string} status 文章状态（必传）
  * @apiParam {string} illustration 文章插图（选传）
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
  async addArticle(req, res) {
    let result = {}
    if (!req.query.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else if (!req.query.title) {
      result = emun.PAR_ARTICLE_TITLE_ERR
    } else if (!req.query.authorId) {
      result = emun.PAR_AUTHOR_ID_ERR
    } else if (!req.query.classId) {
      result = emun.PAR_CLASS_ID_ERR
    } else if (!req.query.content) {
      result = emun.PAR_CONTENT_ERR
    } else if (!req.query.status) {
      result = emun.PAR_STATUS_ERR
    } else {
      result = await service.addArticle(
        req.query.id,
        req.query.title,
        req.query.authorId,
        req.query.classId,
        req.query.content,
        req.query.status,
        req.query.illustration
      )
    }
    res.json(result)
  }

}
