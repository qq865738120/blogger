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
        <el-row type="flex" justify="center" style="margin-bottom: 30px;">
          <el-button
            round
            style="width: 120px;"
            :loading="isLoadingMore"
            @click="onLoadingMore(++page)"
            v-if="!isShowNotMore">
            {{ $t('common.loadingMore') }}
          </el-button>
          <div v-else class="tip flex-center">
            <div></div>
            <span class="font-extra-small color-sub-black">{{ $t('common.bottomLine') }}</span>
            <div></div>
          </div>
        </el-row>

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

/*
获取文章作者详细信息
参数： that Object 页面this引用
      articleId String 文章id
返回： 作者昵称字符串，多位作者用“，”隔开
*/
const _getAuthorInfo = async function (that, articleId) {
  let res = await that.$axios.get('/api/v1/author/info', { params: { articleId: articleId } })
  let result = ''
  if (res.data.code == 200) {
    for (let item of res.data.data) {
      result += (item.nickname + ',')
    }
  }
  return result.substring(0, result.length - 2)
}

/*
更新文章列表
参数： that Object 页面this引用
      page Number 第几页
      isFirst Boolean 是否是第一次更新
返回：页面data对象，包含mainDisplay对象，subDisplay数组，baseDisplay数组
*/
const _updateArticleList = async function (that, page, isFirst) {
  let res = await that.$axios.get('/api/v1/article/createtime', { params: { page: page, row: 10, status: 1, showAuthor: true } })
  if (res.data.code != 200) {
    return
  }
  let result = {
    mainDisplay: {},
    subDisplay: [],
    baseDisplay: []
  }
  let data = res.data.data
  for (let i = 0; i < data.length; i++) {
    if (i == 0 && isFirst) {
      let tags = data[i].keywords.split('##')
      tags.pop()
      result.mainDisplay = {
        id: data[i].id,
        imgSrc: data[i].illustration,
        title: data[i].title,
        describe: data[i].description,
        author: data[i].authorStr,
        tag: tags
      }
    } else if (i > 0 && i < 4 && isFirst) {
      let tags = data[i].keywords.split('##')
      tags.pop()
      result.subDisplay.push({
        id: data[i].id,
        imgSrc: data[i].illustration,
        title: data[i].title,
        author: data[i].authorStr,
        tag: tags
      })
    } else {
      let tags = data[i].keywords.split('##')
      tags.pop()
      result.baseDisplay.push(
        {
          id: data[i].id,
          imgSrc: data[i].illustration,
          title: data[i].title,
          describe: data[i].description,
          author: data[i].authorStr,
          tag: tags
        }
      )
    }
  }
  return result
}

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
      mainDisplay: {},
      subDisplay: [],
      baseDisplay: [],
      page: 1,
      isLoadingMore: false, //加载更多按钮加载状态
      isShowNotMore: false
    }
  },

  async asyncData({ app }) {
    if (process.client) {}
    return await _updateArticleList(app, 1, true)
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
  },

  methods: {
    async onLoadingMore(page) {
      this.isLoadingMore = true;
      let data = await _updateArticleList(this, page, false)
      this.isLoadingMore = false;
      if (data) {
        this.baseDisplay = this.baseDisplay.concat(data.baseDisplay)
      } else {
        this.isShowNotMore = true
      }

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
.tip > div {
  width: 200px;
  border-bottom: 1px solid $--color-main-light-9;
}
.tip > span {
  margin: 0 $--px8;
}
</style>
