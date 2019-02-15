<template>
  <div class="article-root">
    <!-- {{ $route.params.id }} -->
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
  </div>
</template>

<script>
export default {
  layout: 'main',

  data() {
    return {
      title: '标题标题标题标题标题标题标题',
      author: '测试号',
      watchCount: 3225,
      modifyCount: 2315,
      createTime: '2018年10月22日',
      lastTime: '2019年1月16日',
      imgSrc: 'https://static001.infoq.cn/resource/image/b3/2f/b3f838656a0f460890458dbec32c032f.jpg',
      articleContent: ''
    }
  },

  async asyncData({ app, params }) {
    let res = await app.$axios.get('/api/v1/article/id', { params: { id: params.id } })
    // if ()
  },

  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
    }
  },
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
</style>
