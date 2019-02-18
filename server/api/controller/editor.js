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
  * @apiParam {string} keywords 关键词（选传）
  * @apiParam {string} describe 文章描述（必传）
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
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.id) {
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
    } else if (!req.body.describe) {
      result = emun.PAR_DESCRIBE_ERR
    } else {
      result = await service.addArticle(
        req.body.id,
        req.body.title,
        req.body.authorId,
        req.body.classId,
        req.body.content,
        req.body.status,
        req.body.illustration,
        req.body.keywords,
        req.body.describe
      )
    }
    res.json(result)
  },

  /**
  * @api {post} /article/modify 修改文章
  * @apiDescription 修改文章
  * @apiName modify article
  * @apiGroup Article
  * @apiParam {string} id 文章id（必传）
  * @apiParam {string} title 文章标题（选传）
  * @apiParam {string} authorId 作者id（选传）
  * @apiParam {string} lastDate 最后修改日期（选传）
  * @apiParam {string} watchCount 查阅数（选传）
  * @apiParam {string} classId 分类id（选传）
  * @apiParam {string} modifyCount 分类id（选传）
  * @apiParam {string} content 内容（选传）
  * @apiParam {string} status 文章状态（选传）
  * @apiParam {string} illustration 文章插图（选传）
  * @apiParam {string} keywords 关键词（选传）
  * @apiParam {string} describe 文章描述（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '更新成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '更新失败'
  * }
  * @apiVersion 1.0.0
  */
  async updateArticle(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      result = await service.updateArticle(
        req.body.id,
        req.body.title,
        req.body.authorId,
        '',
        req.body.lastDate,
        req.body.watchCount,
        req.body.classId,
        req.body.modifyCount,
        req.body.content,
        req.body.status,
        req.body.illustration,
        req.body.keywords,
        req.body.describe
      )
    }
    res.json(result)
  },

  /**
  * @api {post} /editor/modify 读者修改文章
  * @apiDescription 读者修改文章，非作者本人修改文章
  * @apiName modify article for editor
  * @apiGroup Article
  * @apiParam {string} modifierId 修改人id（必传）
  * @apiParam {string} content 文章内容（必传）
  * @apiParam {string} articleId 文章id（必传）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '失败'
  * }
  * @apiVersion 1.0.0
  */
  async articleModify(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.modifierId) {
      result = emun.PAR_MODIFIER_ID_ERR
    } else if (!req.body.content) {
      result = emun.PAR_CONTENT_ERR
    } else if (!req.body.articleId) {
      result = emun.PAR_AUTHOR_ID_ERR
    } else {
      result = await service.addArticleModification(req.body.modifierId, req.body.content, req.body.articleId)
    }
    res.json(result)
  },

  /**
  * @api {get} /editor/modify 查找读者修改文章（参数三选一）
  * @apiDescription 读者修改文章，非作者本人修改文章
  * @apiName show modify article for editor
  * @apiGroup Article
  * @apiParam {string} id id（选传）
  * @apiParam {string} modifierId 修改人id（选传）
  * @apiParam {string} articleId 文章id（选传）
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
  async getArticleModify(req, res) {
    let result = {}
    console.log('req.query.modifierId', req.query.modifierId);
    if (!req.query.id && !req.query.modifierId && !req.query.articleId) {
      result = emun.PAR_ERR
    } else {
      result = await service.showArticleModification(req.query.id, req.query.modifierId, req.query.articleId)
    }
    res.json(result)
  }

}
