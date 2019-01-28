<template>
  <div class="personal-root">
    <avatar style="margin-top: 40px" :name="$store.state.userInfo.nickname" :signature="$store.state.userInfo.signature" :src="$store.state.userInfo.avatar"></avatar>
    <el-card style="padding: 10px 0px;">
      <el-tabs tab-position="left" style="width: 800px">
        <el-tab-pane :label="$t('personal.personalInfo')">
          <div class="personal-information label-content">
            <el-form :model="infoForm" :rules="rules" status-icon ref="infoForm" label-width="100px" style="width: 600px;">
              <el-form-item :label="$t('personal.nickname')" prop="nickname">
                <el-input type="text" v-model="infoForm.nickname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('personal.signature')" prop="signature">
                <el-input type="text" v-model="infoForm.signature" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item :label="$t('personal.uploadAvatar')">
                <avatar-upload></avatar-upload>
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100px" type="primary" @keyup.enter="submitForm('infoForm')" @click="submitForm('infoForm')">{{ $t('personal.submitUpdate') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('personal.accountSetting')">账号设置</el-tab-pane>
        <el-tab-pane :label="$t('personal.workManagement')">作品管理</el-tab-pane>
        <el-tab-pane :label="$t('personal.myCollection')">我的收藏</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import AvatarUpload from '~/components/AvatarUpload.vue'
let nicknameTip = '';
let signatureTip = '';

export default {
  layout: 'main',
  middleware: 'autho',
  components: {
    Avatar,
    AvatarUpload
  },
  data() {
    var validateNickname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(nicknameTip));
      } else {
        callback();
      }
    };
    var validateSignature = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(signatureTip));
      } else {
        callback();
      }
    };
    return {
      infoForm: {
        nickname: '',
        signature: ''
      },
      rules: {
        nickname: [
          { validator: validateNickname, trigger: 'blur' },
        ],
        signature: [
          { validator: validateSignature, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    nicknameTip = this.$t('personal.nicknameTip')
    signatureTip = this.$t('personal.signatureTip')
  },
  mounted() {
    this.infoForm = {
      nickname: this.$store.state.userInfo.nickname,
      signature: this.$store.state.userInfo.signature
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          let res = await this.$axios.post('/api/v1/user/update', this.infoForm)
          if (res.data.code == 200) {
            this.$message.success('修改成功')
            this.$utils.getUserInfo(this, () => {
              loading.close()
            }, '/personal')
          } else {
            this.$message.error(res.data.msg)
            this.$utils.apiErr(this, res.data)
            loading.close()
          }
        }
      });
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
</style>
