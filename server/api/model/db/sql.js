const utils = require('../../common/utils')
const moment = require('moment')

module.exports = {

  /*
  根据id查找用户
  */
  showUserById: id => {
    return `select nickname, avatar, signature from user where id='${id}'`
  },

  /*
  根据用户名查找用户
  */
  showUserByUsername: username => {
    return `select * from user where username='${username}'`
  },

  /*
  将数据插入用户表
  参数：username 用户名 必传
       passwd 密码 必传
       mnickname 昵称 选传
       mavatar 头像 选传
       mignature 个性签名 选传
  */
  insertUser: (username, passwd, mnickname, mavatar, mignature) => {
    const id = utils.uuid();
    const nickname = mnickname ? mnickname : '匿名者';
    const avatar = mavatar ? mavatar : 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/default-img.jpg'
    const signature = mignature ? mignature : '这人很懒什么也没有留下'
    return `INSERT INTO user
    VALUES ('${id}', '${username}', '${passwd}', '${nickname}', '${avatar}', '${signature}')`
  },

  /*
  更新用户表
  参数：username 用户名 必传
       passwd 密码 选传
       nickname 昵称 选传
       avatar 头像 选传
       signature 个性签名 选传
  */
  updateUser: (username, passwd, nickname, avatar, signature, ) => {
    let passwdStr = passwd ? "passwd = '" + passwd + "'," : '';
    let nicknameStr = nickname ? "nickname = '" + nickname + "'," : '';
    let avatarStr = avatar ? "avatar = '" + avatar + "'," : '';
    let signatureStr = signature ? "signature = '" + signature + "'," : '';
    let sql = `UPDATE user SET ${passwdStr}${nicknameStr}${avatarStr}${signatureStr} WHERE username = '${username}'`
    return sql.replace(', WHERE', ' WHERE')
  },

  /*
  根据id查找文章
  参数：id String article表id
  */
  showArticleById: ( id ) => {
    return `select * from article where id='${id}'`
  },

  /*
  按创建时间降序排列并分页处理
  参数：page Number 第几页
       row Number 一页多少行
       isAsc Boolean 是否升序排列
       status Number 文章状态
       authorId String 作者id
  */
  showArticleByCreateTimeDescPage: ( page, row, isAsc, status, authorId ) => {
    let mPage = page ? parseInt(page) : 0;
    let mRow = row ? parseInt(row) : 20;
    let asc = isAsc ? 'asc' : 'desc';
    let whereStr = ''
    if (status || authorId) {
      whereStr = 'where'
    }
    let mStatus = status ? ' status=' + status + ' AND' : ''
    let mauthorId = authorId ? " author_id='" + authorId + "' AND" : ''
    let str = whereStr + mStatus + mauthorId
    const start = (mPage - 1) * mRow;
    return `select * from article ${str.substring(0, str.length - 3)} order by created_date ${asc} limit ${start}, ${mRow}`
  },

  /*
  将数据插入article表
  参数：id String 主键id
       title String 标题
       authorId String 作者（用户）id
       createdDate Date 创建时间
       lastDate Date 最后修改时间
       classId String 分类id
       content String 文章内容
       status Number 文章状态
       illustration String 文章插图
       keyWords String 关键词
       describe String 文章描述
  */
  insertArticle: ( id, title, authorId, createdDate, lastDate, classId, content, status, illustration, keyWords, describe ) => {
    let dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let mcreatedDate = createdDate ? createdDate : dateTime;
    let mlastDate = lastDate ? lastDate : dateTime;
    let mstatus = status ? status : 0;
    let millustration = illustration ? illustration : 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/article-illustration-default.png';
    let mkeyWords = keyWords ? keyWords : ''
    return `INSERT INTO article (id, title, author_id, created_date, last_date, class_id, content, status, illustration, keywords, description)
    VALUES ('${id}', '${title}', '${authorId}', '${mcreatedDate}', '${mlastDate}', '${classId}', '${content}', '${mstatus}', '${millustration}', '${mkeyWords}', '${describe}')`
  },

  /*
  更新article表
  参数：id String 主键id(必传)
       title String 标题（选传）
       authorId String 作者（用户）id（选传）
       createdDate Date 创建时间（选传）
       lastDate Date 最后修改时间（选传）
       watchCount String 浏览次数（选传）
       classId String 分类id（选传）
       modifyCount String 修改次数（选传）
       content String 文章内容（选传）
       status Number 文章状态（选传）
       illustration String 文章插图（选传）
       keyWords String 关键词（选传）
       describe String 文章描述（选传）
  */
  updateArticle: ( id, title, authorId, createdDate, lastDate, watchCount, classId, modifyCount, content, status, illustration, keyWords, describe ) => {
    let titleStr = title ? "title = '" + title + "'," : '';
    let authorIdStr = authorId ? "author_id = '" + authorId + "'," : '';
    let createdDateStr = createdDate ? "created_date = '" + createdDate + "'," : '';
    let lastDateStr = lastDate ? "last_date = '" + lastDate + "'," : '';
    let watchCountStr = watchCount ? "watch_count = '" + watchCount + "'," : '';
    let classIdStr = classId ? "class_id = '" + classId + "'," : '';
    let modifyCountStr = modifyCount ? "modify_count = '" + modifyCount + "'," : '';
    let contentStr = content ? "content = '" + content + "'," : '';
    let statusStr = status ? "status = '" + status + "'," : '';
    let illustrationStr = illustration ? "illustration = '" + illustration + "'," : '';
    let keyWordsStr = keyWords ? "keywords = '" + keyWords + "'," : '';
    let describeStr = describe ? "description = '" + describe + "'," : '';
    let sql = `UPDATE article SET ${titleStr}${authorIdStr}${createdDateStr}${lastDateStr}${watchCountStr}${classIdStr}${modifyCountStr}${contentStr}${statusStr}${illustrationStr}${keyWordsStr}${describeStr} WHERE id = '${id}'`
    return sql.replace(', WHERE', ' WHERE')
  },

  /*
  查询class表中所有数据
  */
  showClassify: () => {
    return `select * from class`
  },

  /*
  将数据插入user_article表
  参数：id String 主键id
       userId String 用户id
       articleId String 文章id
  */
  insertUserArticle: (id, userId, articleId) => {
    return `INSERT INTO user_article VALUES ('${id}', '${userId}', '${articleId}')`
  },

  /*
  查询user_article表
  参数： userId String 用户id（选传）
        articleId String 文章id（选传）
  */
  showUserArticle: (userId, articleId) => {
    let muserId = userId ? "user_id='" + userId + "'" : '';
    let marticleId = articleId ? "article_id='" + articleId + "'" : '';
    let str = ''
    if (muserId && marticleId) {
      str = `WHERE ${muserId} AND ${marticleId}`
    } else if (muserId) {
      str = `WHERE ${muserId}`
    } else if (marticleId) {
      str = `WHERE ${marticleId}`
    }
    return `select * from user_article ${str} limit 0, 6000`
  },

  /*
  查询指定文章的所有作者/修改者
  参数： articleId String 文章id（必传）
  */
  showAuthorByArticleId: (articleId) => {
    return `SELECT user.id ,user.nickname, user.avatar FROM user_article, user WHERE user_article.article_id='${articleId}' AND user_article.user_id=user.id`
  },

  /*
  将数据插入user_collection_article表
  参数：id String 主键id
       userId String 用户id
       collectionId String 收藏的文章id
  */
  insertUserCollectionArticle: (id, userId, collectionId) => {
    return `INSERT INTO user_collection_article VALUES ('${id}', '${userId}', '${collectionId}')`
  },

  /*
  查询user_collection_article表
  参数： id String 主键id（选传）
        userId String 用户id（选传）
        collectionId String 收藏的文章id（选传）
  */
  showUserCollectionArticle: (id, userId, collectionId) => {
    let mid = id ? ` id='${id}' AND` : '';
    let muserId = userId ? ` user_id='${userId}' AND` : '';
    let mcollectionId = collectionId ? ` collection_id='${collectionId}' AND` : ''
    let sql = '';
    if (!mid && !muserId && !mcollectionId) {
      sql = `SELECT * FROM user_collection_article limit 0, 6000`
    } else {
      sql = `SELECT * FROM user_collection_article WHERE${mid}${muserId}${mcollectionId}`
      sql = sql.substring(0, sql.length - 3)
    }
    return sql
  },

  /*
  删除user_collection_article表数据（三个参数至少传一个）
  参数： id String 主键id（选传）
        userId String 用户id（选传）
        collectionId String 收藏的文章id（选传）
  */
  deleteUserCollectionArticle: (id, userId, collectionId) => {
    let mid = id ? ` id='${id}' AND` : '';
    let muserId = userId ? ` user_id='${userId}' AND` : '';
    let mcollectionId = collectionId ? ` collection_id='${collectionId}' AND` : ''
    let sql = `DELETE FROM user_collection_article WHERE${mid}${muserId}${mcollectionId}`
    sql = sql.substring(0, sql.length - 3)
    return sql
  },

  /*
  将数据插入article_modification表
  参数：id String 主键id
       modifierId String 修改人id
       content String 内容
       articleId String 文章id
  */
  insertArticleModification: (id, modifierId, content, articleId) => {
    let dateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return `INSERT INTO article_modification VALUES ('${id}', '${modifierId}', '${content}', '${dateTime}', '${articleId}')`
  },

  /*
  查询article_modification表（三个参数至少传一个）
  参数：id String 主键id
       modifierId String 修改人id
       articleId String 文章id
  */
  showArticleModification: (id, modifierId, articleId) => {
    let mid = id ? ` id='${id}' AND` : '';
    let mmodifierId = modifierId ? ` modifier_id='${modifierId}' AND` : '';
    let marticleId = articleId ? ` article_id='${articleId}' AND` : ''
    let sql = `SELECT * FROM article_modification WHERE${mid}${mmodifierId}${marticleId}`
    return sql.substring(0, sql.length - 3)
  },

  /*
  根据指定条件查询文章个数
  参数：authorId String 作者id（选传）
       classId String 类型id（选传）
       title String 标题，使用模糊匹配（选传）
       keywords String 关键字，使用模糊匹配（选传）
  */
  showCountArticle: (authorId, classId, title, keywords) => {
    let mauthorId = authorId ? ` author_id='${authorId}' AND` : '';
    let mclassId = classId ? ` class_id='${classId}' AND` : '';
    let mtitle = title ? ` title LIKE '%${title}%' AND` : '';
    let mkeywords = keywords ? ` keywords LIKE '%${keywords}%' AND` : '';
    let str = ''
    if (mauthorId || mclassId || mtitle || mkeywords) {
      let mstr = ` WHERE${mauthorId}${mclassId}${mtitle}${mkeywords}`
      str = mstr.substring(0, mstr.length - 3)
    } else {
      str = ''
    }
    return `SELECT COUNT(*) AS count FROM article${str}`
  },

  /*
  将数据插入book表
  参数：id String 主键id
       title String 书名
       subTitle String 附标题
       cover String 封面
       classId String 类别id
       status String 状态（选填，默认为0）
       authorId String 作者id
  */
  insertBook: (id, title, subTitle, cover, classId, status, authorId) => {
    return `INSERT INTO book VALUES ('${id}', '${title}', '${subTitle}', '${cover ? cover : 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/default-book.jpg'}', '${classId}', '${status ? status : 0}', '${authorId}', '${moment().format('YYYY-MM-DD HH:mm:ss')}')`
  },

  /*
  将数据批量插入chapter表
  参数： values Array 数据，示例 [{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]
  */
  insertChapters: (values) => {
    let str = ''
    for (let i = 0; i < values.length; i++) {
      str += ` ('${values[i].id}', '${values[i].bookId}', '${values[i].title}', '${i}'),`
    }
    return `INSERT INTO chapter VALUES${str.substring(0, str.length - 1)};`
  },

  /*
  更新book表
  参数：id String 书id（必传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       cover String 封面（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
  */
  updateBook: (id, title, subTitle, cover, classId, status, authorId) => {
    let mtitle = title ? ` title='${title}',` : '';
    let msubTitle = subTitle ? ` sub_title='${subTitle}',` : '';
    let mcover = cover ? ` cover='${cover}',` : '';
    let mclassId = classId ? ` class_id='${classId}',` : '';
    let mstatus = status ? ` status='${status}',` : '';
    let mauthorId = authorId ? ` author_id='${authorId}',` : '';
    let str = mtitle + msubTitle + mcover + mclassId + mstatus + mauthorId;
    console.log('updateBook', `UPDATE book SET${str.substring(0, str.length - 1)} WHERE id = '${id}';`);
    return `UPDATE book SET${str.substring(0, str.length - 1)} WHERE id = '${id}';`
  },

  /*
  批量更新chapter表
  参数： values Array 数据，示例 [{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]
  */
  updateChapters: (values) => {
    let idStr = ''
    let bookIdStr = ' book_id = CASE id'
    let titleStr = ' title = CASE id'
    let serialStr = ' serial = CASE id'
    for (let i = 0; i < values.length; i++) {
      idStr += `'${values[i].id}',`
      bookIdStr += ` WHEN '${values[i].id}' THEN '${values[i].bookId}'`
      titleStr += ` WHEN '${values[i].id}' THEN '${values[i].title}'`
      serialStr += ` WHEN '${values[i].id}' THEN '${i}'`
    }
    idStr = idStr.substring(0, idStr.length - 1)
    bookIdStr += 'END,'
    titleStr +='END,'
    serialStr += 'END'
    return `UPDATE chapter SET${bookIdStr}${titleStr}${serialStr} WHERE id IN (${idStr})`
  },

  /*
  查询book表
  参数：id String 书id（选传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
       page Number 第几页（选传，默认第一页）
       row Number 一页多少行（选传，默认20行）
       isAsc Boolean 是否升序排列（选传，默认按创建时间降序）
  */
  showBook: (id, title, subTitle, classId, status, authorId, page, row, isAsc) => {
    let mid = id ? ` id='${id}' AND` : '';
    let mtitle = title ? ` title LIKE '%${title}%' AND` : '';
    let msubTitle = subTitle ? ` sub_title LIKE '%${subTitle}%' AND` : '';
    let mclassId = classId ? ` class_id='${classId}' AND` : '';
    let mstatus = status ? ` status='${status}' AND` : '';
    let mauthorId = authorId ? ` author_id='${authorId}' AND` : '';
    let mPage = page ? parseInt(page) : 1;
    let mRow = row ? parseInt(row) : 20;
    let asc = isAsc ? 'asc' : 'desc';
    let str = ''
    if (mid || mtitle || msubTitle || mclassId || mstatus || mauthorId) {
      str = 'WHERE'
    }
    str += mid + mtitle + msubTitle + mclassId + mstatus + mauthorId;
    const start = (mPage - 1) * mRow;
    console.log('showBook', `SELECT * FROM book ${str.substring(0, str.length - 3)} order by created_date ${asc} limit ${start}, ${mRow};`);
    return `SELECT * FROM book ${str.substring(0, str.length - 3)} order by created_date ${asc} limit ${start}, ${mRow};`
  },

  /*
  查询chapter表（id，bookId，title至少传一个参数）
  参数：id String 章节id（选传）
       bookId String 书id（选传）
       title String 书名（选传）
       isDesc Boolean 是否降序（选传，默认升序）
  */
  showChapter: (id, bookId, title, isDesc) => {
    let mid = id ? ` id='${id}' AND` : '';
    let mbookId = bookId ? ` book_id='${bookId}' AND` : '';
    let mtitle = title ? ` title LIKE '%${title}%' AND` : '';
    let str = mid + mtitle + mbookId;
    console.log('showChapter', `SELECT * FROM book WHERE${str.substring(0, str.length - 3)} order by serial ${isDesc ? 'desc' : 'asc'};`);
    return `SELECT * FROM chapter WHERE${str.substring(0, str.length - 3)}order by serial ${isDesc ? 'desc' : 'asc'};`
  },

  /*
  统计book表查询个数
  参数：id String 书id（选传）
       title String 书名（选传）
       subTitle String 附标题（选传）
       classId String 类别id（选传）
       status String 状态（选填）
       authorId String （选传）
  */
  showCountBook: (id, title, subTitle, classId, status, authorId) => {
    let mid = id ? ` id='${id}' AND` : '';
    let mtitle = title ? ` title LIKE '%${title}%' AND` : '';
    let msubTitle = subTitle ? ` sub_title LIKE '%${subTitle}%' AND` : '';
    let mclassId = classId ? ` class_id='${classId}' AND` : '';
    let mstatus = status ? ` status='${status}' AND` : '';
    let mauthorId = authorId ? ` author_id='${authorId}' AND` : '';
    let str = ''
    if (mid || mtitle || msubTitle || mclassId || mstatus || mauthorId) {
      let mstr = ` WHERE${mid}${mtitle}${msubTitle}${mclassId}${mstatus}${mauthorId}`
      str = mstr.substring(0, mstr.length - 3)
    } else {
      str = ''
    }
    console.log('showCountBook', `SELECT COUNT(*) AS count FROM book${str}`);
    return `SELECT COUNT(*) AS count FROM book${str}`
  },

  /*
  批量删除chapter表数据
  参数：ids Array 章节id数组，示例['1', '2']
  */
  deleteChapters: (ids) => {
    let str = ''
    for (let item of ids) {
      str += `'${item}',`
    }
    console.log('deleteChapters', `DELETE FROM chapter WHERE id IN (${str.substring(0, str.length - 1)});`);
    return `DELETE FROM chapter WHERE id IN (${str.substring(0, str.length - 1)});`
  },

  /*
  批量插入数据到book_article表
  参数： values Array 数据数组示例[{id: '', bookId: '', articleId: '', sectionTitle: '', chapterId: ''}]参数说明如下
         id String 主键id
         bookId String 书id
         articleId String 文章id
         sectionTitle String 标题
         chapterId String 章节id
  */
  insertBookArticles: (values) => {
    let str = ''
    for (let i = 0; i < values.length; i++) {
      str += ` ('${values[i].id}', '${values[i].bookId}', '${values[i].articleId}', '${values[i].sectionTitle}', '${values[i].chapterId}', '${i}'),`
    }
    console.log('insertBookArticles', `INSERT INTO book_article VALUES${str.substring(0, str.length - 1)};`);
    return `INSERT INTO book_article VALUES${str.substring(0, str.length - 1)};`
  },

}
