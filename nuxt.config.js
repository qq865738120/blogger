const pkg = require('./package')

module.exports = {
  mode: 'universal',

  env: {
    cosPath: 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com',
    HOST: 'www.cutey.net.cn',
    PORT: '80'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'keywords', content: 'Open-blogger是一个开放博客平台' },
      { name: 'description', content: 'Open-blogger是一个开放博客平台' },
      { name: 'og:description', content: 'Open-blogger是一个开放博客平台' },
      { name: 'og:title', content: 'Open - blogger 开放博客平台' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'http://www.cutey.net.cn' },
      { name: 'og:image', content: 'http://www.cutey.net.cn/logo.png' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    script: [
      { src: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/highlight.min.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' },
      // { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/vs.min.css' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#994800',
    height: '3px'
  },

  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css'
    '@/theme/index.css',
    '@/assets/style/global.scss',
    'element-ui/lib/theme-chalk/display.css',
    '@/assets/style/normalize.css',
    '@/assets/style/highlight.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      // element-ui组件库
      src: '@/plugins/element-ui',
      ssr: true
    },
    {
      // vue国际化支持
      src: '@/plugins/i18n',
      ssr: true
    },
    {
      // 滚动条
      src: '@/plugins/vue-gemini-scrollbar',
      ssr: false
    },
    {
      // 图片懒加载
      src: '@/plugins/vue-lazyload',
      ssr: true
    },
    {
      // 工具
      src: '@/plugins/utils',
      ssr: false
    },
    {
      src: '@/plugins/nuxt-quill-plugin.js',
      ssr: false
    }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    // baseURL: 'http://www.cutey.net.cn',
    baseURL: 'http://127.0.0.1:80',
    debug: false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },

    // babel: {
    //   "plugins": [
    //     [
    //       "module-alias",
    //       [
    //         {
    //           "src": "~/configs/base-config",
    //           "expose": "config"
    //         }
    //       ]
    //     ]
    //   ]
    // }
  }
}
