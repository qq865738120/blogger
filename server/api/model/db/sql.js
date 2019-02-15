const utils = require('../../common/utils')
const moment = require('moment')

module.exports = {

  /*
  根据id查找用户
  */
  showUserById: id => {
    return `select * from user where id='${id}'`
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
  */
  showArticleByCreateTimeDescPage: ( page, row, isAsc, status ) => {
    let mPage = page ? parseInt(page) : 0;
    let mRow = row ? parseInt(row) : 20;
    let asc = isAsc ? 'asc' : 'desc';
    let mStatus = status ? 'where status=' + status : ''
    const start = (mPage - 1) * mRow;
    return `select * from article ${mStatus} order by created_date ${asc} limit ${start}, ${mRow}`
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
  }

}
