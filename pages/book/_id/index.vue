<template>
  <div class="book-page-root">
    <!-- {{ $route.params.id }} -->
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
  export default {
    layout: 'main',

    data() {
      return {
        // url: 'https://images.gitbook.cn/6c7d5560-252d-11e9-bc2f-6d43685c46dc?imageMogr2/thumbnail/1500x625!',
        url: 'https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/default-book.jpg',
        index: 1,
        chapter: '喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森喀什地方阿斯蒂芬安德森',
        author: '糯米',
        date: '2019/2/16',
        title: '的首发式地方撒旦发',
        articleContent: ''
      }
    }

  }
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

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
  filter: blur(20px) grayscale(36%) contrast(75%);
  object-fit: cover;
  position: absolute;
  top: 0;
  z-index: -1;
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
