<template>
  <div class="personal-root">
    <avatar style="margin-top: 40px" name="nicheng" signature="nishiwodeweiyi" src="http://www.yougexing.net/uploads/180625/1-1P625150924-50.jpg"></avatar>
    <el-card>
      <el-tabs tab-position="left" style="height: 600px; width: 900px">
        <el-tab-pane label="用户管理">个人信息</el-tab-pane>
        <el-tab-pane label="配置管理">账号设置</el-tab-pane>
        <el-tab-pane label="角色管理">作品管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">我的收藏</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'

export default {
  layout: 'main',
  middleware: 'autho',
  components: {
    Avatar
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.personal-root {

}
</style>
