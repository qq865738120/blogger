<template>
  <div class="works-card-root" @click="onClick">
    <el-card class="works-card-content hover-pointer" :body-style="{ padding: '0px', position: 'relative' }" shadow="hover">
      <el-badge :value="tagValue" :type="tagTpye" style="position: absolute; top: 12px; right: 6px;" />
      <img v-lazy="img" class="image">
      <div style="padding: 14px;">
        <span class="title" style="-webkit-box-orient: vertical">{{ title }}</span>
        <div class="bottom">
          <span class="time">{{ date }}</span>
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
    title: String,
    date: String,
    img: String,
    isShowButton: {
      type: Boolean,
      default: true
    },
    status: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      tagValue: '',
      tagTpye: 'danger'
    }
  },

  created() {
    if (process.client) {
      switch(this.status) {
        case 1: this.tagValue = '已发布'; this.tagTpye = 'danger'; break;
        case 0: this.tagValue = '草稿'; this.tagTpye = 'info'; break;
      }
      console.log('tagTpye', this.tagTpye);
    }
  },

  methods: {
    onClick() {
      this.$router.push({ path: `/article/${this.id}` })
    },
    onEdit() {
      this.$router.push({name: 'editor', params: { id: this.id, type: 'article' }})
    }
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
  object-fit: cover;
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
  color: $--color-main-light-4;
}
.bottom>div:hover {
  color: $--secondary-color;
}
.bottom>div:first-of-type {
  margin-left: $--px16;
}
</style>
