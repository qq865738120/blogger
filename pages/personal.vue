<template>
  <div class="personal-root">
    <avatar style="margin-top: 40px" name="nicheng" signature="nishiwodeweiyi" src="http://www.yougexing.net/uploads/180625/1-1P625150924-50.jpg"></avatar>
    <el-card>
      <el-tabs tab-position="left" style="width: 900px">
        <el-tab-pane label="个人信息">
          <div class="personal-information label-content">
            <avatar-upload></avatar-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账号设置">账号设置</el-tab-pane>
        <el-tab-pane label="作品管理">作品管理</el-tab-pane>
        <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import AvatarUpload from '~/components/AvatarUpload.vue'

export default {
  layout: 'main',
  middleware: 'autho',
  components: {
    Avatar,
    AvatarUpload
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/style/common';

.personal-root {

}
.label-content {
  margin: 0 $--px20;
}
</style>
