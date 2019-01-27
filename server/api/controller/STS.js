const config = require('../../../configs/index')
const sts = require('qcloud-cos-sts')

var allowScope = function (scope) {

  var allow = (scope || []).every(function (item) {
    if (item.action === 'name/cos:GetService') {
      return config.STS.allowActions.includes(item.action);
    } else {
      return config.STS.allowActions.includes(item.action) &&
        item.bucket === config.STS.bucket &&
        item.region === config.STS.region &&
        (item.prefix || '').startsWith(config.STS.allowPrefix);
    }
  });
  return allow;
};

module.exports = {

  /**
  * @api {post} /file/sts 对象存储临时凭证
  * @apiDescription 对象存储临时凭证
  * @apiName getScope
  * @apiGroup file
  * @apiParam {Array} options 配置参数
  * @apiSuccess {Number} credentials 云API参数
  * @apiSuccess {Number} expiredTime 密钥的失效时间，是 UNIX 时间戳
  * @apiSuccess {Number} startTime 密钥的起始时间，是 UNIX 时间戳
  * @apiSuccessExample {json} Success:
  *{
  *  credentials: {
  *    sessionToken: "daaeba2eb21c69750b188af4e2d022972fec17d130001",
  *    tmpSecretId: "AKIDU1zH4FiL2uCkQF4yN9Xedt4u8tz5Yu2x",
  *    tmpSecretKey: "uYRbsfm4pdtZ4SlfdSJSkN7oB3KGybOS"
  *  }
  *  expiredTime: 1548599718,
  *  startTime: 1548597918
  *}
  * @apiErrorExample {json} Error:
  * {
  *   code: 300,
  *   msg: '参数异常'
  * }
  * @apiVersion 1.0.0
  */
  getScope(req, res) {
    let cof = config.STS
    var scope = req.body;
    if (!scope || !scope.length || !allowScope(scope)) {
      return res.json({
        code: 300,
        msg: "参数异常"
      });
    }

    // 获取临时密钥
    var policy = sts.getPolicy(scope);
    sts.getCredential({
      secretId: cof.secretId,
      secretKey: cof.secretKey,
      proxy: cof.proxy,
      durationSeconds: cof.durationSeconds,
      policy: policy,
    }, (err, tempKeys) => {
      res.json(err || tempKeys || '');
    });
  },

}
