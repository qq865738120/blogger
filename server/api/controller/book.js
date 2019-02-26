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
  * @apiParam {Array} values 数据，示例：[{id: '', bookId: '', title: ''}, {bookId: '', title: ''}] id为选传
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
  * @apiParam {Number} status 状态（选传）
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
      result = await service.updateBook(req.body.id, req.body.name, req.body.subTitle, req.body.cover, req.body.classId, req.body.status, req.body.authorId)
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
  * @apiParam {string} id 主键id（选传）
  * @apiParam {string} name 书名（选传）
  * @apiParam {string} subTitle 副标题（选传）
  * @apiParam {string} classId 分类id（选传）
  * @apiParam {Number} status 状态（选传）
  * @apiParam {string} authorId 作者id（选传）
  * @apiParam {Number} page 第几页（选传，默认第一页）
  * @apiParam {Number} row 一页多少行（选传，默认20行）
  * @apiParam {Boolean} isAsc 是否升序排列（选传，默认按创建时间降序）
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
    result = await service.showBook(req.query.id, req.query.name, req.query.subTitle, req.query.classId, req.query.status, req.query.authorId, req.query.page, req.query.row, req.query.isAsc)
    res.json(result)
  },

  /**
  * @api {get} /book/count 查询书籍/连载个数
  * @apiDescription 查询书籍/连载个数
  * @apiName show book count
  * @apiGroup Book
  * @apiParam {string} id 主键id（选传）
  * @apiParam {string} name 书名（选传）
  * @apiParam {string} subTitle 副标题（选传）
  * @apiParam {string} classId 分类id（选传）
  * @apiParam {Number} status 状态（选传）
  * @apiParam {string} authorId 作者id（选传）
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
  async getBookCount(req, res) {
    let result = {}
    result = await service.showCountBook(req.query.id, req.query.name, req.query.subTitle, req.query.classId, req.query.status, req.query.authorId)
    res.json(result)
  },

  /**
  * @api {get} /chapters 查询章节
  * @apiDescription 查询章节（id，bookId，title至少传一个参数）
  * @apiName show chapters
  * @apiGroup Book
  * @apiParam {string} id 主键id（选传）
  * @apiParam {string} bookId 书id（选传）
  * @apiParam {string} title 标题（选传）
  * @apiParam {Boolean} isDesc 是否降序根据序号排列（选传）
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
  async getChapters(req, res) {
    let result = {}
    result = await service.showChapter(req.query.id, req.query.bookId, req.query.title, req.query.isDesc)
    res.json(result)
  },

  /**
  * @api {get} /chapters/delete 批量删除章节
  * @apiDescription 批量删除章节
  * @apiName delete chapters
  * @apiGroup Book
  * @apiParam {Array} ids 章节id数组，示例['1', '2']
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
  *   msg: 'ids参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async deleteChapters(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.query.ids) {
      result = emun.PAR_IDS_ERR
    } else {
      result = await service.deleteChapters(req.query.ids)
    }
    res.json(result)
  },

  /**
  * @api {post} /book/article 批量增加书与文章的关系
  * @apiDescription 批量增加书与文章的关系
  * @apiName add bookArticles
  * @apiGroup Book
  * @apiParam {Array} values 数据，示例：[{bookId: '', articleId: '', sectionTitle: '', chapterId: ''}]
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
  async addBookArticles(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    }  else if (!req.body.values) {
      result = emun.PAR_VALUES_ERR
    } else {
      result = await service.addBookArticles(req.body.values)
    }
    res.json(result)
  },

  /**
  * @api {get} /book/article/delete 批量删除小节
  * @apiDescription 批量删除小节
  * @apiName delete book_article
  * @apiGroup Book
  * @apiParam {Array} ids 章节id数组，示例['1', '2']
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
  *   msg: 'ids参数异常'
  * }
  * @apiVersion 1.0.0
  */
  async deleteBookArticles(req, res) {
    let result = {}
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else if (!req.query.ids) {
      result = emun.PAR_IDS_ERR
    } else {
      result = await service.deleteBookArticles(req.query.ids)
    }
    res.json(result)
  },

  /**
  * @api {get} /book/article 查询小节的数据
  * @apiDescription 查询小节的数据（至少传一个参数）
  * @apiName show book_article
  * @apiGroup Book
  * @apiParam {string} id 主键id（选传）
  * @apiParam {string} bookId 书id（选传）
  * @apiParam {string} articleId 文章id（选传）
  * @apiParam {string} sectionTitle 标题（选传）
  * @apiParam {string} chapterId 章节id（选传）
  * @apiParam {Boolean} isDesc 是否降序根据序号排列（选传）
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
  async getBookArticle(req, res) {
    let result = {}
    result = await service.showBookArticle(req.query.id, req.query.bookId, req.query.articleId, req.query.sectionTitle, req.query.chapterId, req.query.isDesc)
    res.json(result)
  },

  /**
  * @api {get} /redundance/book/article 删除小节中冗余数据
  * @apiDescription 删除小节中冗余数据
  * @apiName delete book_article redundance
  * @apiGroup Book
  * @apiParam {String} bookId 书id
  * @apiSuccess {Number} code 错误码 200：成功；300：没有冗余数据
  * @apiSuccess {String} msg 错误信息
  * @apiSuccessExample {json} Success:
  *{
  *  code: 200,
  *  msg: '成功'
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '没有冗余数据'
  * }
  * @apiVersion 1.0.0
  */
  async deleteRedundanceBookArticle(req, res) {
    let result = {}
    if (!req.query.bookId) {
      result = emun.PAR_IDS_ERR
    } else {
      result = await service.deleteRedundanceBookArticle(req.query.bookId)
    }
    res.json(result)
  },

}
