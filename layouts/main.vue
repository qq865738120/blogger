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
          <div class="iconfont open-logo logo hover-pointer"/>
        </el-col>
        <el-col :span="7">
          <el-menu
            class="header-menu"
            mode="horizontal"
            :default-active="currentPath"
            background-color="#2B3843"
            text-color="#fff"
            active-text-color="#FF9C00"
            router>
            <el-menu-item
              index="/">
              {{ $t('header.homePage') }}
            </el-menu-item>
            <el-menu-item
              index="/classify">
              {{ $t('header.classify') }}
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6">
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
                prefix-icon="el-icon-search"
                @keyup.enter.native="onSearch"/>
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
              <el-dropdown v-if="$store.state.isLogin" placement="bottom-start" @command="onDropdown">
                <img class="main-avatar hover-pointer" :src="$store.state.userInfo.avatar" />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1" class="dropdown-item font-medium iconfont open-gerenzhongxin-xuanzhongxin">个人中心</el-dropdown-item>
                  <el-dropdown-item command="2" class="dropdown-item font-medium iconfont open-zhuxiao">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin: 0 auto;" :style="{ minHeight: minHeight }">
      <nuxt/>
    </el-main>
    <el-footer
      class="bg-color-main-color"
      height="200px">
      <el-row
        type="flex"
        justify="center">
        <img
          :src="logSrc"
          style="width: 128px; height: 52.6px; margin: 60px 0 24px 0;">
      </el-row>
      <el-row
        class="fonter-bottom"
        type="flex"
        justify="center">
        <span>友情链接：</span>
        <a class="hover-pointer" href="https://github.com/">GitHub</a>
        <a class="hover-pointer" href="https://www.cnblogs.com/">博客园</a>
        <a class="hover-pointer" href="https://www.blogger.com">Blogger</a>
        <a class="hover-pointer" href="https://www.infoq.cn/">InfoQ</a>
        <a class="hover-pointer" href="https://segmentfault.com/">思否</a>
      </el-row>
      <el-row type="flex" justify="center">
        <span style="padding-top: 20px;" class="font-extra-extra-small color-base-black-4">鄂ICP备17003728号-2</span>
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
      minHeight: '',
      currentPath: '/'
    }
  },
  created() {
    if (process.client) {
      this.minHeight = window.innerHeight - 260 + 'px'
    }
  },
  mounted() {
    this.logSrc = process.env.cosPath + '/system/logo.png';
    this.currentPath = this.$route.fullPath
    if (this.$store.state.isLogin && this.$store.state.userInfo == '') {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.4)'
      });
      this.$axios.get('/api/v1/user/info').then(res => {
        this.$utils.apiErr(this, res.data)
        if (res.data.code == 200) {
          this.$store.commit('SET_USER_INFO', res.data.data)
        }
        loading.close()
      })
    }
    this.$axios.get('/api/v1/classify').then(res => {
      this.$store.commit('SET_CLASSIFY', res.data.data)
    })
  },
  methods: {
    onDropdown(e) {
      if (e == 1) {
        this.$router.push('/personal')
      } else if (e == 2) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.4)'
        });
        this.$axios.get('/api/v1/logout').then(res => {
          console.log('注销', res.data);
          loading.close()
          this.$message({
            message: res.data.msg,
            type: res.data.code == 200 ? 'success' : 'error'
          });
          if (res.data.code == 200) {
            this.$router.push('/');
            setTimeout(() => {
              location.reload();
            }, 1000)

          }
        })
      }
    },

    onSearch(e) {
      this.$store.commit('SET_SEARCH_KEY', this.searchInput)
      this.$router.push('/search')
    }

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
.main-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid white;
}
.main-avatar:hover {
  border: 1px solid $--secondary-color;
}
.dropdown-item {
  padding: $--px8 $--px30;
}
.dropdown-item::before {
  margin-right: $--px8
}
</style>
