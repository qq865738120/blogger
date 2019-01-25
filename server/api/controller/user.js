const emun = require('../common/userEmun')
const service = require('../services/authoService')
var md5 = require('md5');

module.exports = {

  async userInfo(req, res) {
    let result = {}
    console.log('req.session.user', req.session);
    if (!req.session.user) {
      result = emun.NOT_LOGIN
    } else {
      result = service.showUserInfo(req.session.user.username)
    }
    res.json(result)
  }
}
