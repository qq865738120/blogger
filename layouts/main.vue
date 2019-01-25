<template>
  <el-container>
    <el-header class="header bg-color-main-color">
      <el-row
        :gutter="20"
        type="flex"
        justify="center"
        align="middle">
        <el-col
          :span="2"
          class="flex-inline-center">
          <div class="iconfont open-logo logo hover-pointer" @click="$router.push('/')"/>
        </el-col>
        <el-col :span="9">
          <el-menu
            class="header-menu"
            mode="horizontal"
            default-active="1"
            background-color="#2B3843"
            text-color="#fff"
            active-text-color="#FF9C00">
            <el-menu-item
              index="1">
              {{ $t('header.homePage') }}
            </el-menu-item>
            <el-menu-item
              index="2">
              {{ $t('header.classify') }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="4">
          <el-row
            :gutter="20"
            type="flex"
            justify="end">
            <el-col :span="18">
              <el-input
                v-model="searchInput"
                :clearable="true"
                :placeholder="$t('header.search.placeholder')"
                class="search-input"
                maxlength="120"
                minlength="2"
                prefix-icon="el-icon-search"/>
            </el-col>
            <el-col :span="10">
              <div
                v-if="!$store.state.isLogin"
                class="flex-center font-small"
                style="width: 100%; height: 100%; color: white; font-weight: 400;">
                <span class="hover-pointer" @click="$router.push('/signin')">{{ $t('header.login') }}</span>
                <span class="line bg-color-main-light-8"/>
                <span class="hover-pointer" @click="$router.push('/signup')">{{ $t('header.register') }}</span>
              </div>
              <img class="avatar hover-pointer" @click="$router.push('/personal')" v-lazy="$store.state.userInfo.avatar" v-if="$store.state.isLogin" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin: 0 auto">
      <nuxt/>
    </el-main>
    <el-footer
      class="bg-color-main-color"
      height="200px">
      <el-row
        type="flex"
        justify="center">
        <img
          v-lazy="logSrc"
          style="width: 128px; height: 52.6px; margin: 60px 0 24px 0;">
      </el-row>
      <el-row
        class="fonter-bottom"
        type="flex"
        justify="center">
        <span>友情链接：</span>
        <a>123</a>
        <a>123</a>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      logSrc: '',
    }
  },
  async created() {
    if (this.$store.state.isLogin && this.$store.state.userInfo == '') {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
      });
      this.$axios.get('/api/v1/user/info').then(res => {
        if (res.data.code == 200) {
          this.$store.commit('SET_USER_INFO', res.data.data)
        }
        loading.close()
      })
    }
  },
  mounted() {
    var scrollbar = new this.$geminiScrollbar({
      element: document.body,
      autoshow: true
    }).create()
    this.logSrc = process.env.cosPath + '/system/logo.png'
  }
}
</script>

<style lang="scss">
@import 'assets/style/common';

body {
  background-color: #f4f4f4;
}
.header {
  box-shadow: 0 0px 24px $--color-main-light-1;
}
.logo {
  color: $--color-white;
  font-size: 48px;
  transform: rotate(0deg);
  transition: all 200ms;
}
.logo:hover {
  transform: rotate(30deg);
}
.search-input .el-input__inner {
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.2);
}
.line {
  width: 1px;
  height: 11px;
  margin: 0 10px;
}
.header-menu {
  border-bottom: 0 !important;
}
.fonter-bottom > span,
.fonter-bottom > a {
  margin: 0 3px;
  color: $--color-main-light-5;
}
.fonter-bottom > a:hover {
  color: white;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid white;
}
.avatar:hover {
  border: 1px solid $--secondary-color;
}
</style>
