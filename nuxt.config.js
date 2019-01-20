const pkg = require('./package')
const config = require('./configs/index')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    // 'element-ui/lib/theme-chalk/index.css'
    '@/theme/index.css',
    '@/assets/style/global.scss',
    'element-ui/lib/theme-chalk/display.css',
    '@/assets/style/normalize.css'
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
