<template>
  <div class="article-root">
    <!-- {{ $route.params.id }} -->
    <div class="floating-menu" :hidden="!isShowMenu">
      <floating-menu :articleId="$route.params.id"></floating-menu>
    </div>
    <div class="content">
      <span class="title">{{ title }}</span>
      <p class="author font-small">{{ author }}</p>
      <p class="count font-small">
        <span>{{ watchCount }}</span>
        <select class="line bg-color-main-color"></select>
        <span>{{ modifyCount }}</span>
      </p>
      <p class="time font-small">
        <span>{{ createTime }}</span>
        <select class="line bg-color-main-color"></select>
        <span>{{ lastTime }}</span>
      </p>
      <div class="img">
        <img v-lazy="imgSrc" />
      </div>
      <div class="article-content" v-html="articleContent"></div>
    </div>
    <div style="width: 180px; margin: 0 auto;" class="margin-top-40">
      <floating-menu :isRow="true" :articleId="$route.params.id"></floating-menu>
    </div>
  </div>
</template>

<script>
import FloatingMenu from '~/components/FloatingMenu.vue'

export default {
  layout: 'main',
  components: {
    FloatingMenu
  },
  data() {
    return {
      title: '标题标题标题标题标题标题标题',
      author: '测试号',
      watchCount: 3225,
      modifyCount: 2315,
      createTime: '2018年10月22日',
      lastTime: '2019年1月16日',
      imgSrc: 'https://static001.infoq.cn/resource/image/b3/2f/b3f838656a0f460890458dbec32c032f.jpg',
      articleContent: '',
      isShowMenu: true
    }
  },

  async asyncData({ app, params, route }) {
    let res = await app.$axios.get('/api/v1/article/id', { params: { id: params.id } })
    if (res.data.code == 200) {
      let content = await app.$axios.get(res.data.data.content)
      let authorData = await app.$axios.get('/api/v1/user/info/id', { params: { id: res.data.data.author_id } })
      let author = ''
      if (authorData.data.code == 200) {
        author = authorData.data.data.nickname
      }
      return {
        title: res.data.data.title,
        author: author,
        watchCount: res.data.data['watch_count'],
        modifyCount: res.data.data['modify_count'],
        createTime: res.data.data.created_date,
        lastTime: res.data.data.last_date,
        imgSrc: res.data.data.illustration,
        articleContent: content.data.replace('<pre ', '<pre style="padding: 30px 25px 15px; background: #5a5b5d; border-radius: 3px;" ')
      }

    } else {
      app.router.push({name: 'error', params: { statusCode: 404 }})
    }
  },

  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
      this.createTime = this.$moment(this.createTime).format('YYYY/MM/DD')
      this.lastTime = this.$moment(this.lastTime).format('YYYY/MM/DD')
      window.addEventListener('scroll', this.handleScroll);
    }
  },

  methods: {
    handleScroll() {
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
   		var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
   		var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      if (scrollTop + windowHeight + 300 >= scrollHeight) {
        if (this.isShowMenu) {
          this.isShowMenu = false
        }
      } else {
        if (!this.isShowMenu) {
          this.isShowMenu = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.content {
  width: 760px;
  min-height: 600px;
  padding-top: 36px;
}
.content > p {
  margin-block-start: 0px;
  margin-block-end: $--px8;
}
.title {
  line-height: 36px;
  color: $--color-base-black;
  font-size: 28px;
  font-weight: 500;
}
.author {
  color: $--color-base-black-3;
  margin-block-start: 30px !important;
}
.author::before {
  content: '作者：';
  color: $--color-sub-black;
}
.count,
.time {
  @include felx(flex, row, center, flex-start, nowrap );
}
.count span:nth-of-type(1)::before {
  content: '阅读数：';
  color: $--color-sub-black;
}
.count span:nth-of-type(2)::before {
  content: '修改数：';
  color: $--color-sub-black;
}
.time span:nth-of-type(1)::before {
  content: '创建时间：';
  color: $--color-sub-black;
}
.time span:nth-of-type(2)::before {
  content: '更新时间：';
  color: $--color-sub-black;
}
.line {
  height: 8px;
  width: 1px;
  display: inline-block;
  margin: 0 16px;
}
.img {
  margin: 20px 0 40px 0;
}
.img img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 3px;
}
.floating-menu {
  position: fixed;
  left: 50%;
  top: calc(50% + 60px);
  z-index: 300;
  margin-left: -490px;
  transform: translateY(-50%);
}
</style>
