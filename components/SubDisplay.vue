<template>
  <div class="root">
    <nuxt-link
      :to="{ name: 'article-id', params: { id: 123 }}"
      class="content">
      <div class="img">
        <img
          v-lazy="data.imgSrc"
        >
      </div>
      <div class="content-bottom">
        <p>{{ data.title }}</p>
        <p>{{ data.author }}</p>
        <div class="tags">
          <el-tag
            v-for="(item, index) of data.tag"
            :key="index"
            style="margin-right: 8px"
            type="success"
            size="mini"
            hit
            color="#e9ebec">
            {{ item }}
          </el-tag>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      // required: true,
      default: function() {
        return {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.root {
  width: 210px;
  display: inline-block;
}
.content {
  display: flex;
  flex-direction: column;
}
.content-bottom {
  // width: 254px;
  position: relative;
}
.content-bottom > p:first-of-type {
  color: $--color-base-black;
  font-size: $--large;
  height: 48px;
  line-height: 24px;
  @include over-length(2);
}
.content-bottom > p:first-of-type:hover {
  color: $--color-main-light-2;
}
.content-bottom > p:nth-of-type(2) {
  font-size: $--extra-extra-small;
  color: $--color-base-black-3;
  max-height: 30px;
  overflow-y: hidden;
  line-height: 15px;
}
.content-bottom > p:nth-of-type(2)::before {
  content: '作者：';
  color: $--color-sub-black;
}
.img,
.img > img {
  width: 210px;
  height: 156px;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  object-fit: cover;
}
.img > img:hover {
  transform: scale(1.2);
}
.tags {
  height: 21px;
  overflow: hidden;
  line-height: 20px;
}
</style>
