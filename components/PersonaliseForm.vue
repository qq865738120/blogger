<template>
  <div class="personalise-form-root">
    <el-form :model="infoForm" :rules="rules" status-icon ref="infoForm" label-width="100px" style="width: 600px;">
      <el-form-item :label="$t('personal.nickname')" prop="nickname">
        <el-input type="text" v-model="infoForm.nickname" autocomplete="off" max="14"></el-input>
      </el-form-item>
      <el-form-item :label="$t('personal.signature')" prop="signature">
        <el-input type="text" v-model="infoForm.signature" autocomplete="off" max="24"></el-input>
      </el-form-item>
      <el-form-item :label="$t('personal.uploadAvatar')">
        <avatar-upload></avatar-upload>
      </el-form-item>
      <el-form-item>
        <el-button style="min-width: 100px" type="primary" @click="submitForm('infoForm')">{{ $t('personal.submitUpdate') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import AvatarUpload from '~/components/AvatarUpload.vue'
let nicknameTip = '';
let signatureTip = '';

export default {
  components: {
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
  create() {
    let nicknameTip = this.$t('personal.nicknameTip');
    let signatureTip = this.$t('personal.signatureTip');
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
            this.$message.success(this.$t('common.modifySuccess'))
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

<style scoped lang="scss" >
@import 'assets/style/common';
</style>
