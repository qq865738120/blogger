<template>
  <div class="classify-page-root">
    <div class="head">
      <div class="class-item flex-col-center hover-pointer" v-for="(item, index) of classList">
        <img v-lazy="item.image" />
        <span>{{ item.classification }}</span>
      </div>
    </div>
    <cus-tabs class="tabs" @onItem="onItemTap" />
    <div
      v-show="currentIndex == 0"
      v-for="(item, index) of baseDisplay"
      :key="index"
      class="margin-bottom-20">
      <base-display :data="item" />
    </div>
  </div>
</template>

<script>
import CusTabs from '~/components/CusTabs.vue'
import BaseDisplay from '~/components/BaseDisplay.vue'

export default {
  layout: 'main',
  components: {
    CusTabs,
    BaseDisplay,
  },
  data() {
    return {
      classList: [],
      baseDisplay: [
        {
          author:"糯米",
          describe:"kdhksdh的会计师考试的了了肯定是kdhksdh的会计师考试的了了肯定是kdhksdh的会计师考试的了了肯定是kdhksd",
          id:"5D144B1C49AC4D5BE8C10ED3E597E5",
          imgSrc:"https://weixin-1251663069.cos.ap-chengdu.myqcloud.com/system/article-illustration-default.png",
          tag:['vue', '前端'],
          title:"54646hjsjajhasjs6465as",
        }
      ],
      currentIndex: 0
    }
  },

  async asyncData({ app, store }) {
    if (process.client) {
      if (!store.state.classList) {
        let row = await app.$axios.get('/api/v1/classify')
        if (row.data.code == 200) {
          store.commit('SET_CLASSIFY', row.data.data)

          return {
            classList: row.data.data
          }
        } else {
          this.$router.push({name: 'error', params: { statusCode: 500 }})
        }
      } else {
        return {
          classList: store.state.classList
        }
      }
    }
  },

  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="white";
    }
  },

  methods: {
    onItemTap(index) {
      this.currentIndex = index
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.classify-page-root {
  width: 760px;
}
.head {
  display: flex;
  flex-wrap: wrap;
}
.class-item {
  margin: 30px 30px 0 0;
}
.head > div:nth-of-type(7) {
  margin-right: 0;
}
.class-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 7px 14px 0 rgba(199,209,215,.75);
  margin-bottom: 14px;
  filter: grayscale(50%);
  transition: all 200ms;
  overflow: hidden;
}
.class-item img:hover {
  filter: contrast(140%);
  border-radius: 20px;
}
.tabs {
  margin-top: 60px;
  margin-bottom: 30px;
}
</style>
