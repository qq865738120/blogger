import Vue from 'vue'
const COS = require('cos-js-sdk-v5')
const config = require('@/configs/index')

const getCos = function (that) {
  return new COS({
    getAuthorization: function (options, callback) {
      console.log(options);
      that.$axios.post('/api/v1/file/sts',
        [{
          action: 'name/cos:PutObject',
          bucket: options.Bucket,
          region: options.Region,
          prefix: 'user/*',
        }]
      ).then(res => {
        let data = res.data
        callback({
          TmpSecretId: data.credentials && data.credentials.tmpSecretId,
          TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
          XCosSecurityToken: data.credentials && data.credentials.sessionToken,
          ExpiredTime: data.expiredTime,
        })
      })
    }
  });
}

Vue.prototype.$utils = {

  /*
  单文件上传
  参数：that 页面this引用
       file 文件对象
       username String 用户名
       success Function 上传成功的回调函数
       error Function 上传失败的回调函数
  */
  upLoadFail(that, file, username, success, error) {
    console.log('config', config);
    let cos = getCos(that)
    cos.putObject({
      Bucket: 'weixin-1251663069',
      Region: 'ap-chengdu',
      Key: `user/${username}/${file.uid}.${file.type.split('/')[1]}`,
      Body: file,
      onHashProgress: function (progressData) {
        console.log('校验中', JSON.stringify(progressData));
      },
      onProgress: function (progressData) {
        console.log('上传中', JSON.stringify(progressData));
      },
    }, function (err, data) {
      if (err) {
        error(err)
      } else if (data) {
        success(data)
      }
    });
  }

}
