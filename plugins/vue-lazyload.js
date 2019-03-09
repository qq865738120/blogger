import Vue from 'vue'
import VueLazyload from 'vue-lazyload' //图片懒加载插件

Vue.use(VueLazyload, {
  attempt: 1,
  lazyComponent: true,
  error: 'https://q.img.soukong.cn/timg.jpg',
  loading: 'https://q.img.soukong.cn/timg.jpg'
})
