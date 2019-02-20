const emun = require('../common/bookEmun')
const service = require('../services/bookService')

module.exports = {

  /**
  * @api {post} /book 新增书籍/连载
  * @apiDescription 添加新的数据或连载
  * @apiName add book
  * @apiGroup Book
  * @apiParam {string} id 主键id
  * @apiParam {string} name 书名
  * @apiParam {string} subTitle 副标题（选传）
  * @apiParam {string} cover 封面图（选传）
  * @apiParam {string} classId 分类id
  * @apiParam {string} authorId 作者id
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: 'name参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async addBook(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.id) {
      result = emun.PAR_ID_ERR
    } else if (!req.body.name) {
      result = emun.PAR_NAME_ERR
    } else if (!req.body.classId) {
      result = emun.PAR_CLASS_ID_ERR
    } else if (!req.body.authorId) {
      result = emun.PAR_AUTHOR_ID_ERR
    } else {
      result = await service.addBook(req.body.id, req.body.name, req.body.subTitle, req.body.cover, req.body.classId, req.body.authorId)
    }
    res.json(result)
  },

  /**
  * @api {post} /chapters 批量新增章节
  * @apiDescription 批量新增章节
  * @apiName add chapters
  * @apiGroup Book
  * @apiParam {Array} values 数据，示例：[{bookId: '', title: ''}, {bookId: '', title: ''}]
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: 'values参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async addChapters(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    }  else if (!req.body.values) {
      result = emun.PAR_VALUES_ERR
    } else {
      result = await service.addChapters(req.body.values)
    }
    res.json(result)
  },

  /**
  * @api {post} /book/update 修改书籍/连载
  * @apiDescription 修改书籍/连载
  * @apiName update book
  * @apiGroup Book
  * @apiParam {string} id 主键id（必传）
  * @apiParam {string} name 书名（选传）
  * @apiParam {string} subTitle 副标题（选传）
  * @apiParam {string} cover 封面图（选传）
  * @apiParam {string} classId 分类id（选传）
  * @apiParam {string} authorId 作者id（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: 'name参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async updateBook(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.id) {
      result = emun.PAR_ID_ERR
    } else {
      result = await service.updateBook(req.body.id, req.body.name, req.body.subTitle, req.body.cover, req.body.classId, req.body.authorId)
    }
    res.json(result)
  },

  /**
  * @api {post} /chapters/update 批量修改章节
  * @apiDescription 批量修改章节
  * @apiName update chapters
  * @apiGroup Book
  * @apiParam {Array} values 数据，示例：[{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: 'values参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async updateChapters(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.body.values) {
      result = emun.PAR_VALUES_ERR
    } else {
      result = await service.updateChapters(req.body.values)
    }
    res.json(result)
  },

  /**
  * @api {get} /book 查询书籍/连载
  * @apiDescription 查询书籍/连载（至少传一个参数）
  * @apiName show book
  * @apiGroup Book
  * @apiParam {string} id 主键id（必传）
  * @apiParam {string} name 书名（选传）
  * @apiParam {string} subTitle 副标题（选传）
  * @apiParam {string} classId 分类id（选传）
  * @apiParam {string} authorId 作者id（选传）
  * @apiSuccess {Number} code 错误码 200：成功；300：传参异常
  * @apiSuccess {String} msg 错误信息
  * @apiSuccess {Array} data 数据
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
  async getBook(req, res) {
    let result = {}
    result = await service.showBook(req.query.id, req.query.name, req.query.subTitle, req.query.classId, req.query.authorId)
    res.json(result)
  },

}
