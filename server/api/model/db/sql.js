const utils = require('../../common/utils')

module.exports = {

  /*
  根据id查找用户
  */
  showUserById: id => {
    return `select * from user where id=${id}`
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
       mavatar 头像 宣传
  */
  insertUser: (username, passwd, mnickname, mavatar) => {
    const id = utils.uuid();
    const nickname = mnickname ? mnickname : '匿名者';
    const avatar = mavatar ? mavatar : 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/default-img.jpg'
    return `INSERT INTO user
    VALUES ('${id}', '${username}', '${passwd}', '${nickname}', '${avatar}')`
  }

}
