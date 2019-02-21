<template>
  <div class="book-root" @click="onClick">
    <el-card class="content flex-col-center hover-pointer" :style="{ width: width, height: height }" shadow="hover">
      <div class="flex-col-center">
        <img v-lazy="img" />
        <p class="title color-base-black" :style="{ fontSize: titleSize, lineHeight: lineHeight }" style="-webkit-box-orient: vertical;">{{ title }}</p>
        <span v-if="author" class="font-extra-extra-small color-sub-black">{{ $t('common.author') }} <span class="color-main-color">{{ author }}</span></span>
        <span v-if="startDate" class="margin-top-10 font-extra-extra-small color-sub-black">{{ $t('common.start') }} {{ startDate }}</span>
        <div class="bottom">
          <div v-if="isShowButton" class="iconfont open-bianji font-extra-extra-small" @click.stop="onEdit"></div>
          <div class="iconfont open-ai-share font-extra-extra-small"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    id: String,
    width: {
      type: String,
      default: '180px'
    },
    height: {
      type: String,
    },
    titleSize: {
      type: String,
      default: '14px'
    },
    img: {
      type: String,
      default: 'http://www.haipic.com/icon/32d5903237.jpg'
    },
    title: String,
    author: String,
    startDate: String,
    isShowButton: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      lineHeight: parseInt(this.titleSize.split('px')[0]) + 5 + 'px'
    }
  },
  methods: {
    onClick() {
      // this.$router.push({ path: `/article/${this.id}` })
    },
    onEdit() {
      this.$router.push({name: 'editor', params: { id: this.id, type: 'book' }})
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.content {
  border: 0px !important;
}
.content img {
  width: 100px;
  height: 140px;
  box-shadow: 0 7px 14px 0 rgba(199,209,215,.75);
  object-fit: cover;
}
.title {
  @include over-length(2);
  height: 36px;
}
.bottom {
  line-height: 12px;
  display: flex;
}
.bottom>div {
  margin-left: $--px8;
  color: $--color-main-light-4;
}
.bottom>div:hover {
  color: $--secondary-color;
}
</style>
