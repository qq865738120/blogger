import Vue from 'vue'
import moment from "moment";
const COS = require('cos-js-sdk-v5')
const config = require('@/configs/index')
const MD5 = require('md5')

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

/*
获取cos实力
参数： that 页面this引用
      action cos操作权限
*/
const getCos = function (that, action) {
  return new COS({
    getAuthorization: function (options, callback) {
      console.log(options);
      that.$axios.post('/api/v1/file/sts',
        [{
          action: 'name/cos:' + action,
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

Vue.prototype.$moment = moment;

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
  参数：that 页面this引用
       file 文件对象
       username String 用户名
       success Function 上传成功的回调函数
       error Function 上传失败的回调函数
  */
  upLoadFile(that, file, username, success, error) {
    let cos = getCos(that, 'PutObject')
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
  单文件删除
  参数：that 页面this引用
       key String 文件路径加文件名
       success Function 成功的回调函数
       error Function 失败的回调函数
  */
  deleteFile(that, key, success, error) {
    let cos = getCos(that, 'DeleteObject')
    console.log('key', key);
    cos.deleteObject({
      Bucket: config.STS.bucket,
      Region: config.STS.region,
      Key: key
    }, function(err, data) {
      console.log(err, data);
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
  },

  /*
  计算md5值
  参数：str String 需要进行md5加密的字符串
  */
  md5(str) {
    return MD5(str)
  },

  /*
  生成uuid
  参数：length Number 长度
       radixs Number 进制
  */
  uuid(length, radixs) {
    let len = length ? length : 30;
    let radix = radixs ? radixs : 16;
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
    return uuid.join('');
  },

  /*
  等待某个任务执行完后继续执行后面的代码。需要在store中注册一个标志
  ，并且需要使用异步函数或者是promise。
  参数： context Object 页面this引用
        valueName String store中用于判断的标志变量
  */
  waitTask(context, valueName) {
    return new Promise(function(resolve) {
      let timeout = 0
      const id = setInterval(() => {
        timeout++
        if (context.$store.state[valueName]) {
          clearInterval(id)
          resolve(true)
        } else if (timeout == 300) {
          resolve(false)
        }
        resolve()
      }, 100);
    })
  },

  /*
  等待获取用户信息
  参数： context Object 页面this引用
        callback Function 用户信息数据就位后的回调函数
  */
  async waitUserInfo(context, callback) {
    let wait = await context.$utils.waitTask(context, 'userInfo')
    if (wait) {
      callback()
    } else {
      context.$utils.getUserInfo(context, callback, context.$route.fullPath)
    }
  }

}
