define({ "api": [
  {
    "type": "post",
    "url": "/article/add",
    "title": "新增文章",
    "description": "<p>增加新的文章</p>",
    "name": "add_article",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>文章状态（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "illustration",
            "description": "<p>文章插图（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "describe",
            "description": "<p>文章描述（必传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n code: 200,\n msg: '新增文章成功'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '新增文章失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/editor.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/article/modify",
    "title": "修改文章",
    "description": "<p>修改文章</p>",
    "name": "modify_article",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>文章标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastDate",
            "description": "<p>最后修改日期（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "watchCount",
            "description": "<p>查阅数（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "modifyCount",
            "description": "<p>分类id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>内容（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "status",
            "description": "<p>文章状态（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "illustration",
            "description": "<p>文章插图（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键词（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "describe",
            "description": "<p>文章描述（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 201,\n  msg: '更新失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/editor.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/editor/modify",
    "title": "读者修改文章",
    "description": "<p>读者修改文章，非作者本人修改文章</p>",
    "name": "modify_article_for_editor",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "modifierId",
            "description": "<p>修改人id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "content",
            "description": "<p>文章内容（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id（必传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 201,\n  msg: '失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/editor.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/article/count",
    "title": "查询文章数量",
    "description": "<p>根据指定条件查询文章数量</p>",
    "name": "select_article_count",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "classId",
            "description": "<p>类别id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keywords",
            "description": "<p>关键字（选传）</p>"
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
            "description": "<p>错误码 200：成功；201：没有找到相关作者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据（没数据返回空）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: {\n   count: 63\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '查询失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/home.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/author/info",
    "title": "查询作者详细信息",
    "description": "<p>根据文章id查询所有参与该文章修改或编写的所有作者信息</p>",
    "name": "select_author",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id（必传）</p>"
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
            "description": "<p>错误码 200：成功；201：没有找到相关作者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据（没数据返回空）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '没有找到相关作者'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/home.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/author",
    "title": "查询作者或者文章",
    "description": "<p>根据用户id查询该用户所有相关文章或者根据文章id查询该文章所有用户</p>",
    "name": "select_user_article",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id（选传）</p>"
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
            "description": "<p>错误码 200：成功；201：没有找到相关作者</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据（没数据返回空）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '没有找到相关作者'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/home.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/article/createtime",
    "title": "文章查询通过create_time",
    "description": "<p>文章查询通过create_time，升序或者降序排了，并且分页处理</p>",
    "name": "show_article_by_createtime",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>第几页（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "row",
            "description": "<p>该页多少行（选传，默认20）</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "asc",
            "description": "<p>是否升序排列（选传，默认降序）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>文章状态（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "showAuthor",
            "description": "<p>是否展示作者昵称，默认不展示提升性能（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "authorId",
            "description": "<p>根据作者id筛选结果（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据（没数据返回空）</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
    "filename": "server/api/controller/home.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/article/id",
    "title": "文章查询通过id",
    "description": "<p>文章查询通过id</p>",
    "name": "show_article_by_id",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>文章id</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
    "filename": "server/api/controller/home.js",
    "groupTitle": "Article"
  },
  {
    "type": "get",
    "url": "/editor/modify",
    "title": "查找读者修改文章（参数三选一）",
    "description": "<p>读者修改文章，非作者本人修改文章</p>",
    "name": "show_modify_article_for_editor",
    "group": "Article",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "modifierId",
            "description": "<p>修改人id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "articleId",
            "description": "<p>文章id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/editor.js",
    "groupTitle": "Article"
  },
  {
    "type": "post",
    "url": "/book",
    "title": "新增书籍/连载",
    "description": "<p>添加新的数据或连载</p>",
    "name": "add_book",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>主键id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>书名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTitle",
            "description": "<p>副标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": "<p>封面图（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 300,\n  msg: 'name参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "post",
    "url": "/chapters",
    "title": "批量新增章节",
    "description": "<p>批量新增章节</p>",
    "name": "add_chapters",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "values",
            "description": "<p>数据，示例：[{bookId: '', title: ''}, {bookId: '', title: ''}]</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 300,\n  msg: 'values参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "get",
    "url": "/book",
    "title": "查询书籍/连载",
    "description": "<p>查询书籍/连载（至少传一个参数）</p>",
    "name": "show_book",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>主键id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>书名（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTitle",
            "description": "<p>副标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page",
            "description": "<p>第几页（选传，默认第一页）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "row",
            "description": "<p>一页多少行（选传，默认20行）</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isAsc",
            "description": "<p>是否升序排列（选传，默认按创建时间降序）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "get",
    "url": "/book/count",
    "title": "查询书籍/连载个数",
    "description": "<p>查询书籍/连载个数</p>",
    "name": "show_book_count",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>主键id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>书名（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTitle",
            "description": "<p>副标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>状态（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "get",
    "url": "/chapters",
    "title": "查询章节",
    "description": "<p>查询章节（id，bookId，title至少传一个参数）</p>",
    "name": "show_chapters",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>主键id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "bookId",
            "description": "<p>书id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "title",
            "description": "<p>标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDesc",
            "description": "<p>是否降序根据序号排列（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "post",
    "url": "/book/update",
    "title": "修改书籍/连载",
    "description": "<p>修改书籍/连载</p>",
    "name": "update_book",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>主键id（必传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>书名（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subTitle",
            "description": "<p>副标题（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "cover",
            "description": "<p>封面图（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "classId",
            "description": "<p>分类id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authorId",
            "description": "<p>作者id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 300,\n  msg: 'name参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
  {
    "type": "post",
    "url": "/chapters/update",
    "title": "批量修改章节",
    "description": "<p>批量修改章节</p>",
    "name": "update_chapters",
    "group": "Book",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "values",
            "description": "<p>数据，示例：[{id: '', bookId: '', title: ''}, {id: '', bookId: '', title: ''}]</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
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
          "content": "{\n  code: 300,\n  msg: 'values参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/book.js",
    "groupTitle": "Book"
  },
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
    "url": "/uuid",
    "title": "获取uuid",
    "description": "<p>获取uuid</p>",
    "name": "get_uuid",
    "group": "Other",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "length",
            "description": "<p>长度（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "radixs",
            "description": "<p>进制（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功'\n data: ''\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/common.js",
    "groupTitle": "Other"
  },
  {
    "type": "get",
    "url": "/classify",
    "title": "查询分类列表",
    "description": "<p>查询分类列表</p>",
    "name": "select_classify",
    "group": "Other",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：成功；300：传参异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: []\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error:",
          "content": "{\n  code: 201,\n  msg: '失败'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/common.js",
    "groupTitle": "Other"
  },
  {
    "type": "post",
    "url": "/article/collection/delete",
    "title": "取消文章收藏",
    "description": "<p>取消文章收藏的接口，需要有登录权限</p>",
    "name": "cancel_collection_article",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collectionId",
            "description": "<p>文章id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：参数异常</p>"
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
          "content": "{\n  code: 300,\n  msg: 'collectionId参数异常'\n}",
          "type": "json"
        }
      ]
    },
    "version": "1.0.0",
    "filename": "server/api/controller/user.js",
    "groupTitle": "User"
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
    "url": "/article/collection",
    "title": "收藏文章",
    "description": "<p>收藏文章接口，需要有登录权限</p>",
    "name": "collection_article",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collectionId",
            "description": "<p>文章id</p>"
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
            "description": "<p>错误码 200：成功；300：参数异常</p>"
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
          "content": "{\n  code: 300,\n  msg: '参数异常'\n}",
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
    "url": "/article/collection",
    "title": "获取收藏文章",
    "description": "<p>获取收藏的文章接口，需要有登录权限</p>",
    "name": "show_collection_article",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>收藏id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>用户id（选传）</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "collectionId",
            "description": "<p>文章id（选传）</p>"
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
            "description": "<p>错误码 200：成功；300：参数异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: []\n}",
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
    "filename": "server/api/controller/user.js",
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
    "type": "get",
    "url": "/user/info/id",
    "title": "查询用户信息",
    "description": "<p>查询用户信息</p>",
    "name": "userInfo_by_id",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>错误码 200：成功；300：参数异常</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>错误信息</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '成功',\n data: ''\n}",
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
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "{\n code: 200,\n msg: '更新成功',\n data: ''\n}",
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
