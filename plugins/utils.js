import Vue from 'vue'
const COS = require('cos-js-sdk-v5')
const config = require('@/configs/index')

const apiErr = function(that, data, loading) {
  if (data.code && data.code == 301) {
    that.$message.error(that.$t('common.notLoginTip'));
    location.reload();
    that.$router.push(path ? path : '/signin')
  }
  if (loading) {
    loading.close()
  }
}

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
        apiErr(that, data)
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
  api返回统一异常处理
  参数：that 页面this引用
       data 接口返回数据
      loading对象
  */
  apiErr,

  /*
  单文件上传
  参数：that 页面that引用
       file 文件对象
       username String 用户名
       success Function 上传成功的回调函数
       error Function 上传失败的回调函数
  */
  upLoadFail(that, file, username, success, error) {
    let cos = getCos(that)
    cos.putObject({
      Bucket: config.STS.bucket,
      Region: config.STS.region,
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
  },

  /*
  更新用户信息
  参数：path String 成功之后的跳转路径，默认跳转到首页
       call Function 方法运行完成后的回调函数，用于结束loading效果
       that 页面this引用
  */
  getUserInfo(that, call, path) {
    that.$axios.get('/api/v1/user/info').then(res => {
      apiErr(that, res.data)
      if (res.data.code == 200) {
        that.$store.commit('SET_USER_INFO', res.data.data)
        that.$router.push(path ? path : '/')
      }
      call()
    })
  },

  /*
  登录方法
  参数：that 页面this引用
       parm Object 登录接口所需参数{ passwd: '', username: '' }
       path String 成功之后的跳转路径，默认跳转到首页
       call Function 方法运行完成后的回调函数，用于结束loading效果
  */
  doLogin(that, parm, call, path) {
    that.$axios.post('/api/v1/login', parm).then(res => {
      console.log('login登录接口', res.data);
      let type = 'error'
      if (res.data.code == 200) { //登陆成功
        type = 'success'
        that.$store.commit('SET_LOGIN', true)
        this.getUserInfo(that, call, path)
      } else {
        that.$store.commit('SET_LOGIN', false)
        call()
      }
      that.$message({
        message: res.data.msg,
        type
      });
    })
  },

  /*
  loading封装方法
  参数：that 页面this引用
  返回：loading对象
  */
  loading(that) {
    return that.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.4)'
    });
  }

}
