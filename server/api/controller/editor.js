const emun = require('../common/articleEmun')
const service = require('../services/editorService')

module.exports = {

  /**
  * @api {post} /article/add 新增文章
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
  async addArticle(req, res) {
    let result = {}
    if (!req.body.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else if (!req.body.title) {
      result = emun.PAR_ARTICLE_TITLE_ERR
    } else if (!req.body.authorId) {
      result = emun.PAR_AUTHOR_ID_ERR
    } else if (!req.body.classId) {
      result = emun.PAR_CLASS_ID_ERR
    } else if (!req.body.content) {
      result = emun.PAR_CONTENT_ERR
    } else if (!req.body.status) {
      result = emun.PAR_STATUS_ERR
    } else {
      result = await service.addArticle(
        req.body.id,
        req.body.title,
        req.body.authorId,
        req.body.classId,
        req.body.content,
        req.body.status,
        req.body.illustration
      )
    }
    res.json(result)
  }

}
