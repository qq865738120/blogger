<template>
  <div class="personal-root">
    <avatar style="margin-top: 40px" :name="$store.state.userInfo.nickname" :signature="$store.state.userInfo.signature" :src="$store.state.userInfo.avatar"></avatar>
    <el-card style="padding: 10px 0px;">
      <el-tabs tab-position="left" style="width: 800px" :value="activeName" @tab-click="onTabsTap">
        <el-tab-pane :label="$t('personal.personalInfo')" name="personalInfo">
          <div class="personal-information label-content">
            <p class="tab-item-title iconfont open-shouye">{{ $t('personal.personalise') }}</p>
            <personalise-form></personalise-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('personal.accountSetting')" name="accountSetting">
          <div class="personal-information label-content">
            <p class="tab-item-title iconfont open-anquan">{{ $t('personal.security') }}</p>
            <safety-setting-form></safety-setting-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('personal.workManagement')" name="workManagement">
          <div class="personal-information label-content">
            <p class="tab-item-title iconfont open-wenzhang1">{{ $t('personal.article') }}</p>
            <works-card-list></works-card-list>
            <p class="tab-item-title iconfont open-icon-- secend-title">{{ $t('personal.serial') }}</p>
            <book-list></book-list>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('personal.myCollection')" name="myCollection">
          <div class="personal-information label-content">
            <p class="tab-item-title iconfont open-shoucang">{{ $t('personal.allCollection') }}</p>
            <collection-list></collection-list>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import PersonaliseForm from '~/components/PersonaliseForm.vue'
import SafetySettingForm from '~/components/SafetySettingForm.vue'
import WorksCardList from '~/components/WorksCardList.vue'
import BookList from '~/components/BookList.vue'
import CollectionList from '~/components/CollectionList.vue'

export default {
  layout: 'main',
  middleware: 'autho',
  components: {
    Avatar,
    PersonaliseForm,
    SafetySettingForm,
    WorksCardList,
    BookList,
    CollectionList
  },
  data() {
    return {
      activeName: 'personalInfo'
    }
  },
  created() {
    if (process.client) {
      this.activeName = this.$route.params.tabsName ? this.$route.params.tabsName : ( localStorage.getItem('personalTabs') ? localStorage.getItem('personalTabs') : 'personalInfo' )
    }
  },
  mounted() {
    if (process.client) {
      document.getElementsByTagName('body')[0].style.background="#f4f4f4";
    }
  },
  methods: {
    onTabsTap(e) {
      localStorage.setItem('personalTabs', e._props.name);
    }
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
.tab-item-title {
  font-size: $--large;
  color: $--color-base-black-2;
  padding-bottom: $--px10;
  border-bottom: 1px solid $--color-main-light-8;
  margin-block-start: 0;
  margin-block-end: $--px30;
}
.secend-title {
  margin-top: 60px;
}
</style>
