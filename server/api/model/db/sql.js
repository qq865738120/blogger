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
  */
  showArticleByCreateTimeDescPage: ( page, row, isAsc ) => {
    let mPage = page ? parseInt(page) : 0;
    let mRow = row ? parseInt(row) : 20;
    let asc = isAsc ? 'asc' : 'desc';
    const start = (mPage - 1) * mRow;
    return `select * from article order by created_date ${asc} limit ${start}, ${mRow}`
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
  */
  insertArticle: ( id, title, authorId, createdDate, lastDate, classId, content, status, illustration ) => {
    let dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let mcreatedDate = createdDate ? createdDate : dateTime;
    let mlastDate = lastDate ? lastDate : dateTime;
    let mstatus = status ? status : 0;
    let millustration = illustration ? illustration : 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/article-illustration-default.png';
    return `INSERT INTO article (id, title, author_id, created_date, last_date, class_id, content, status, illustration)
    VALUES ('${id}', '${title}', '${authorId}', '${mcreatedDate}', '${mlastDate}', '${classId}', '${content}', '${mstatus}', '${illustration}')`
  },

  /*
  查询class表中所有数据
  */
  showClassify: () => {
    return `select * from class`
  },

}
