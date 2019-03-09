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
  * @apiParam {Number} status 文章状态（选传）
  * @apiParam {Boolean} showAuthor 是否展示作者昵称，默认不展示提升性能（选传）
  * @apiParam {String} authorId 根据作者id筛选结果（选传）
  * @apiParam {String} classId 根据分类id筛选结果（选传）
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
      result = await service.showArticleByCreateTime(req.query.page, row, asc, req.query.status, req.query.showAuthor, req.query.authorId, req.query.classId)
    }
    res.json(result)
  },

  /**
  * @api {get} /author 查询作者或者文章
  * @apiDescription 根据用户id查询该用户所有相关文章或者根据文章id查询该文章所有用户
  * @apiName select user_article
  * @apiGroup Article
  * @apiParam {String} userId 用户id（选传）
  * @apiParam {String} articleId 文章id（选传）
  * @apiSuccess {Number} code 错误码 200：成功；201：没有找到相关作者
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
  *   code: 201,
  *   msg: '没有找到相关作者'
  * }
  * @apiVersion 1.0.0
  */
  async getUserArticle(req, res) {
    let result = {}
    result = await service.showUserArticle(req.query.userId, req.query.articleId)
    res.json(result)
  },

  /**
  * @api {get} /author/info 查询作者详细信息
  * @apiDescription 根据文章id查询所有参与该文章修改或编写的所有作者信息
  * @apiName select author
  * @apiGroup Article
  * @apiParam {String} articleId 文章id（必传）
  * @apiSuccess {Number} code 错误码 200：成功；201：没有找到相关作者
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
  *   code: 201,
  *   msg: '没有找到相关作者'
  * }
  * @apiVersion 1.0.0
  */
  async getAuthor(req, res) {
    let result = {}
    if (!req.query.articleId) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      result = await service.showAuthorByArticleId(req.query.articleId)
    }
    res.json(result)
  },

  /**
  * @api {get} /article/count 查询文章数量
  * @apiDescription 根据指定条件查询文章数量
  * @apiName select article count
  * @apiGroup Article
  * @apiParam {String} authorId 作者id（选传）
  * @apiParam {String} classId 类别id（选传）
  * @apiParam {String} title 标题（选传）
  * @apiParam {String} keywords 关键字（选传）
  * @apiSuccess {Number} code 错误码 200：成功；201：没有找到相关作者
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Object} data 数据（没数据返回空）
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功',
  *  data: {
  *    count: 63
  *  }
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 201,
  *   msg: '查询失败'
  * }
  * @apiVersion 1.0.0
  */
  async getArticleCount(req, res) {
    let result = {}
    result = await service.showCountArticle(req.query.authorId, req.query.classId, req.query.title, req.query.keywords)
    res.json(result)
  },


  /**
  * @api {get} /article/watch 增加文章阅读数量
  * @apiDescription 增加文章阅读数量
  * @apiName add article watch count
  * @apiGroup Article
  * @apiParam {String} id 文章id（必传）
  * @apiSuccess {Number} code 错误码 200：成功；300：文章id参数异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '文章id参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async addWatchArticle(req, res) {
    let result = {}
    if (!req.query.id) {
      result = emun.PAR_ARTICLE_ID_ERR
    } else {
      result = await service.addWatchArticle(req.query.id)
    }
    res.json(result)
  },

  /**
  * @api {get} /article/hot 查询热点文章
  * @apiDescription 查询热点文章
  * @apiName show hot article
  * @apiGroup Article
  * @apiParam {String} count 数量（选传，默认6）
  * @apiSuccess {Number} code 错误码 200：成功；
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *  data: []
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '文章id参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async showHotArticle(req, res) {
    let result = {}
    result = await service.showHotArticle(req.query.count)
    res.json(result)
  }

}
