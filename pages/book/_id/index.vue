<template>
  <div class="book-page-root">
    <!-- {{ $route.params.id }} -->
    <div class="table-contents">
      <table-contents :name="name" :bookId="$route.params.id" @onNodeTap="onNodeTap"></table-contents>
    </div>
    <div class="head flex-col-center">
      <img v-lazy="url"/>
      <p class="webfont color-base-black-3">第{{ index }}章</p>
      <div class="line"></div>
      <span class="font-extra-large color-sub-black">{{ chapter }}</span>
      <div class="head-left-bottom color-main-light-6 font-medium flex-col-center">
        <span>{{ author }}</span>
        <span>{{ date }}</span>
      </div>
    </div>
    <div class="content margin-top-24">
      <span class="title">{{ title }}</span>
      <div class="article-content" v-html="articleContent"></div>
    </div>
  </div>
</template>

<script>
import FloatingMenu from '~/components/FloatingMenu.vue'
import TableContents from '~/components/TableContents.vue'

export default {
  layout: 'main',

  components: {
    TableContents
  },

  data() {
    return {
      // url: 'https://images.gitbook.cn/6c7d5560-252d-11e9-bc2f-6d43685c46dc?imageMogr2/thumbnail/1500x625!',
      name: '',
      url: 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/default-book.jpg',
      index: 1,
      chapter: '喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森',
      author: '',
      date: '2019/2/16',
      title: '的首发式地方撒旦发',
      articleContent: ''
    }
  },

  async created() {
    let res = await this.$axios.get('/api/v1/book', { params: { id: this.$route.params.id } })
    if (res.data.code == 200) {
      this.url = res.data.data[0].cover,
      this.date = this.$moment(res.data.data[0].created_date).format('YYYY/MM/DD')
      this.name = res.data.data[0].title
      let userRes = await this.$axios.get('/api/v1/user/info/id', { params: { id: res.data.data[0].author_id } })
      if (userRes.data.code == 200) {
        this.author = userRes.data.data.nickname
      }
    } else {
      this.$router.push({name: 'error', params: { statusCode: 500 }})
    }
  },

  async mounted() {

  },

  methods: {
    async onNodeTap(e) {
      console.log('e', e);
      this.index = e.serial
      this.chapter = this.$store.state.treeData[e.serial - 1].label
      let loading = this.$utils.loading(this)
      let res = await this.$axios.get('/api/v1/article/id', { params: { id: e.id } })
      if (res.data.code == 200) {
        this.title = res.data.data.title
        let content = await this.$axios.get(res.data.data.content)
        this.articleContent = content.data
      }
      loading.close();
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.table-contents {
  position: fixed;
  left: 50%;
  top: calc(50% + 60px);
  z-index: 300;
  margin-left: 430px;
  transform: translateY(-50%);
}
.head {
  width: 800px;
  height: 380px;
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  margin-top: 30px;
  box-shadow: 0 7px 14px 0 rgba(199, 209, 215, 0.75);
}
.head > img {
  width: 100%;
  height: 100%;
  filter: blur(20px) grayscale(45%) contrast(75%);
  object-fit: cover;
  position: absolute;
  top: 0;
  z-index: -100;
}
.head > p {
  font-size: 60px;
  text-align: center;
  margin-block-start: 0;
  margin-block-end: 0;
}
.head > span {
  width: 460px;
  text-align: center;
  font-family: cursive;
  line-height: 24px;
}
.line {
  width: 500px;
  height: 4px;
  border-radius: 2px;
  background-color: $--color-base-black-3;
  margin: 8px 6px;
}
.head-left-bottom {
  position: absolute;
  bottom: 20px;
  right: 30px;
  font-style: oblique;
}
.head-left-bottom > span:first-of-type {
  margin-bottom: 3px;
}
.head-left-bottom > span:first-of-type::before {
  content: '作者：'
}
.content {
  width: 760px;
  min-height: 600px;
  background-color: white;
  padding: 36px 20px;
  border-radius: 3px;
  box-shadow: 0 7px 14px 0 rgba(199, 209, 215, 0.75);
}
.title {
  line-height: 36px;
  color: $--color-base-black;
  font-size: 28px;
  font-weight: 500;
}
</style>
