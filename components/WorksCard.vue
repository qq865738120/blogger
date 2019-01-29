<template>
  <div class="works-card-root">
    <el-card class="works-card-content" :body-style="{ padding: '0px' }" shadow="hover">
      <img v-lazy="img" class="image">
      <div style="padding: 14px;">
        <span class="title" style="-webkit-box-orient: vertical">{{ title }}</span>
        <div class="bottom">
          <span class="time">{{ date }}</span>
          <div class="iconfont open-bianji font-extra-extra-small"></div>
          <div class="iconfont open-ai-share font-extra-extra-small"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    img: String
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.works-card-content {
  width: 180px;
  // height: 240px;
}
.works-card-content .image {
  width: 100%;
  height: 180px;
  display: block;
  border: 0px !important;
}
.title {
  @include over-length(1);
}
.time {
  font-size: $--px12;
  color: $--color-sub-black;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
}
.bottom>div {
  margin-left: $--px8;
  color: $--color-main-light-2;
}
.bottom>div:hover {
  color: $--secondary-color;
}
.bottom>div:first-of-type {
  margin-left: $--px16;
}
</style>
