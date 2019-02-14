<template>
  <div
    class="flex-inline-between"
    style="width: 1080px">
    <div style="width: 712px">

      <!-- 精选内容start -->
      <el-card class="max-box-card">
        <div
          slot="header"
          class="clearfix">
          <span class="iconfont open-zhishi font-extra-large">{{ $t('homePage.choice') }}</span>
        </div>
        <main-display :data="mainDisplay"/>
        <div
          class="flex-inline-between margin-top-24"
          style="width: 100%">
          <sub-display
            v-for="(item, index) of subDisplay"
            :key="index"
            :data="item" />
        </div>
      </el-card>
      <!-- 精选内容end -->

      <!-- 推荐内容start -->
      <el-card class="max-box-card margin-top-20">
        <div
          slot="header"
          class="clearfix">
          <span class="iconfont open-yuedu font-extra-large">{{ $t('homePage.recommend') }}</span>
        </div>
        <div
          v-for="(item, index) of baseDisplay"
          :key="index"
          class="margin-bottom-20">
          <base-display :data="item" />
        </div>
      </el-card>
      <!-- 推荐内容end -->

    </div>
    <div style="width: 344px;">

      <!-- 热点start -->
      <el-card class="max-box-card">
        <div
          slot="header"
          class="clearfix">
          <span class="iconfont open-neifenmike font-extra-large">{{ $t('homePage.hotspot') }}</span>
        </div>
        <div>
          <hot-list />
        </div>
      </el-card>
      <!-- 热点end -->
    </div>
  </div>
</template>

<script>
import MainDisplay from '~/components/MainDisplay.vue'
import SubDisplay from '~/components/SubDisplay.vue'
import BaseDisplay from '~/components/BaseDisplay.vue'
import HotList from '~/components/HotList.vue'

export default {
  layout: 'main',
  components: {
    MainDisplay,
    SubDisplay,
    BaseDisplay,
    HotList
  },
  data() {
    return {
      mainDisplay: {
        imgSrc:
          'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
        title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
        describe: '年终盘点之区块链：拨霾见日，大路朝天',
        author: '覃云，徐川',
        tag: ['区块链', 'web']
      },
      subDisplay: [
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        }
      ],
      baseDisplay: [
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          describe: '年终盘点之区块链：拨霾见日，大路朝天',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          describe: '年终盘点之区块链：拨霾见日，大路朝天',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          describe: '年终盘点之区块链：拨霾见日，大路朝天',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          describe: '年终盘点之区块链：拨霾见日，大路朝天',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        },
        {
          imgSrc:
            'https://static001.infoq.cn/resource/image/ea/74/ea1ed1fe11dc85f2ffb37dda5c2b4574.jpg?x-oss-process=image/crop,y_145,w_999,h_514/resize,w_776,h_400',
          title: '2018 年终盘点：“年度爆款”的区块链真的结束了吗？',
          describe: '年终盘点之区块链：拨霾见日，大路朝天',
          author: '覃云，徐川',
          tag: ['区块链', 'web']
        }
      ],
      page: 1
    }
  },

  async asyncData({ app }) {
    let res = await app.$axios.get('/api/v1/article/createtime', { params: { page: 1, row: 30 } })
    let result = {
      mainDisplay: {},
      subDisplay: [],
      baseDisplay: []
    }
    let data = res.data.data
    for (let i = 0; i < data.length; i++) {
      if (i == 0) {
        let tags = data[i].keywords.split('##')
        tags.pop()
        result.mainDisplay = {
          imgSrc: data[i].illustration,
          title: data[i].title,
          describe: data[i].description,
          author: '12',
          tag: tags
        }
      } else if (i > 0 && i < 4) {
        let tags = data[i].keywords.split('##')
        tags.pop()
        result.subDisplay.push({
          imgSrc: data[i].illustration,
          title: data[i].title,
          author: '12',
          tag: tags
        })
      } else {
        let tags = data[i].keywords.split('##')
        tags.pop()
        result.baseDisplay.push(
          {
            imgSrc: data[i].illustration,
            title: data[i].title,
            describe: data[i].description,
            author: '12',
            tag: tags
          }
        )
      }
    }
    return result
  },

  async fetch({ app, store }) {
    let { data } = await app.$axios.get('/api/v1/check')
    if (data.code != 200) {
      store.commit('SET_LOGIN', false)
    } else {
      store.commit('SET_LOGIN', true)
      if (!store.state.userInfo) {
        let { data } = await app.$axios.get('/api/v1/user/info')
        if (data.code == 200) {
          store.commit('SET_USER_INFO', data.data)
        }
      }
    }
  },

  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="#f4f4f4";
    }
  }

}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.max-box-card {
  width: 100%;
}
.max-box-card div:last-of-type {
  @include spacing(margin, bottom, 0);
}
</style>
