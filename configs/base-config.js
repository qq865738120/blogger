module.exports = {
  mysql: {
    connectionLimit: 20,
    user: 'root',
    password: 'Mysql675919#',
    database: 'blogger'
  },
  session: {
    secret: 'cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
      // domain: 'xxx.xxx.xxx.xxx:xxxx', // 域名
      path: '/',
      httpOnly: true, // 开启后前端无法通过 JS 操作
      maxAge: 30 * 60 * 1000
    },
  },
  redis: {
    prefix: 'blog-'
  },
  redisStore: {

  },
  STS: {
    secretId: 'AKID3xc1B6QEPL1RaUaXgZDn7G9oEOJypYVD', // 固定密钥
    secretKey: 'c1C9QTIvJTQ8cstgEcmiQuACzYsypSr1', // 固定密钥
    proxy: '',
    durationSeconds: 1800, // 密钥有效期

    // 放行判断相关参数
    bucket: 'weixin-1251663069', // 换成你的 bucket
    region: 'ap-chengdu', // 换成 bucket 所在地区
    allowPrefix: 'user/*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的目录，例子：* 或者 a/* 或者 a.jpg
    // 密钥的权限列表。简单上传和分片需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
      // 简单上传
      'name/cos:PutObject',
      'name/cos:PostObject',
      // 分片上传
      'name/cos:InitiateMultipartUpload',
      'name/cos:ListMultipartUploads',
      'name/cos:ListParts',
      'name/cos:UploadPart',
      'name/cos:CompleteMultipartUpload',
      // 简单删除权限
      'name/cos:DeleteObject',
    ],
  }
}
