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

  }
}
