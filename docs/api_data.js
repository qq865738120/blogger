define({ "api": [
  {
    "type": "post",
    "url": "/file/sts",
    "title": "对象存储临时凭证",
    "description": "<p>对象存储临时凭证，需要先登录获取用户权限</p>",
    "name": "getScope",
    "group": "File",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "options",
            "description": "<p>配置参数</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "credentials",
            "description": "<p>云API参数</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "expiredTime",
            "description": "<p>密钥的失效时间，是 UNIX 时间戳</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "startTime",
            "description": "<p>密钥的起始时间，是 UNIX 时间戳</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n credentials: {\n   sessionToken: \"daaeba2eb21c69750b188af4e2d022972fec17d130001\",\n   tmpSecretId: \"AKIDU1zH4FiL2uCkQF4yN9Xedt4u8tz5Yu2x\",\n   tmpSecretKey: \"uYRbsfm4pdtZ4SlfdSJSkN7oB3KGybOS\"\n }\n expiredTime: 1548599718,\n startTime: 1548597918\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 300,\n  msg: '参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/STS.js",
    "groupTitle": "File"
  },
  {
    "type": "get",
    "url": "/check",
    "title": "检验用户登录",
    "description": "<p>检验用户登录</p>",
    "name": "check",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：验证通过；201：验证失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '验证通过'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '验证失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/autho.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "用户登录",
    "description": "<p>用户登录</p>",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "passwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：登录成功；201：用户名或者密码不正确；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '登陆成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 300,\n  msg: '密码参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/autho.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "退出登陆",
    "description": "<p>退出登陆</p>",
    "name": "logout",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：注销成功；201：注销失败</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n  code: 200,\n  msg: '注销成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '注销失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/autho.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/registered",
    "title": "用户注册",
    "description": "<p>用户注册</p>",
    "name": "registered",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "passwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：注册成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '注册成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 300,\n  msg: '用户名已存在'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/autho.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/info",
    "title": "查询用户信息",
    "description": "<p>查询用户信息，需要先登录获取用户权限</p>",
    "name": "userInfo",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：成功；301：没有登录</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 301,\n  msg: '没有登录'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/update",
    "title": "更新用户信息",
    "description": "<p>更新用户信息，需要先登录获取用户权限</p>",
    "name": "userUpdate",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "parm",
            "description": "<p>需要更新的用户信息</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：成功；301：没有登录</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '更新成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 301,\n  msg: '没有登录'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/user.js",
    "groupTitle": "User"
  }
] });
