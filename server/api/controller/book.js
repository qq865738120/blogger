const emun = require('../common/bookEmun')
const service = require('../services/bookService')

module.exports = {

  /**
  * @api {post} /book 新增书籍/连载
  * @apiDescription 添加新的数据或连载
  * @apiName add book
  * @apiGroup Book
  * @apiParam {string} name 书名
  * @apiParam {string} subTitle 副标题
  * @apiParam {string} cover 封面图
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
    }  else if (!req.body.name) {
      result = emun.PAR_NAME_ERR
    } else if (!req.body.subTitle) {
      result = emun.PAR_SUB_TITLE_ERR
    } else if (!req.body.cover) {
      result = emun.PAR_COVER_ERR
    } else if (!req.body.classId) {
      result = emun.PAR_CLASS_ID_ERR
    } else if (!req.body.authorId) {
      result = emun.PAR_AUTHOR_ID_ERR
    } else {
      result = await service.addBook(req.body.name, req.body.subTitle, req.body.cover, req.body.classId, req.body.authorId)
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
  *   msg: 'name参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async addChapters(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    }  else if (!req.body.values) {
      result = emun.PAR_NAME_ERR
    } else {
      result = await service.addChapters(req.body.values)
    }
    res.json(result)
  }

}
