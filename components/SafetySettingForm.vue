<template>
  <div class="personalise-form-root">
    <el-form :model="safeForm" :rules="rules" status-icon ref="safeForm" label-width="100px" style="width: 600px;">
      <el-form-item :label="$t('personal.oldPasswd')" prop="oldPasswd">
        <el-input type="password" v-model="safeForm.oldPasswd" autocomplete="off" max="30" :placeholder="$t('signinPage.form.passwdTip')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('personal.newPasswd')" prop="newPasswd">
        <el-input type="password" v-model="safeForm.newPasswd" autocomplete="off" max="30" :placeholder="$t('signinPage.form.passwdTip')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('signupPage.form.rePasswd')" prop="prePasswd">
        <el-input type="password" v-model="safeForm.prePasswd" autocomplete="off" max="30" :placeholder="$t('signupPage.form.passwdTip2')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="min-width: 100px" type="primary" @click="submitForm('safeForm')">{{ $t('common.confirmChanges') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

let oldPasswdTip = '';
let newPasswdTip = '';
let prePasswdTip = '';
let passwdTip3 = ''

export default {
  components: {

  },
  data() {
    var validateOldPasswd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(oldPasswdTip));
      } else if (this.$utils.md5(value) !== this.$store.state.userInfo.passwd) {
        callback(new Error(this.$t('common.passwdErr')));
      } else {
        callback()
      }
    };
    var validateNewPasswd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(newPasswdTip));
      } else {
        callback();
      }
    };
    var validatePrePasswd = (rule, value, callback) => {
      if (!value) {
        callback(new Error(prePasswdTip));
      } else if (value !== this.safeForm.newPasswd) {
        callback(new Error(passwdTip3));
      } else {
        callback();
      }
    };
    return {
      safeForm: {
        oldPasswd: '',
        newPasswd: '',
        prePasswd: ''
      },
      rules: {
        oldPasswd: [
          { validator: validateOldPasswd, trigger: 'blur' },
        ],
        newPasswd: [
          { validator: validateNewPasswd, trigger: 'blur' }
        ],
        prePasswd: [
          { validator: validatePrePasswd, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    oldPasswdTip = this.$t('signinPage.form.passwdTip');
    newPasswdTip = this.$t('signinPage.form.passwdTip');
    prePasswdTip = this.$t('signupPage.form.passwdTip2');
    passwdTip3 = this.$t('signupPage.form.passwdTip3')
  },
  mounted() {
    this.safeForm = {
      nickname: this.$store.state.userInfo.nickname,
      signature: this.$store.state.userInfo.signature
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          let res = await this.$axios.post('/api/v1/user/update', { passwd: this.safeForm.newPasswd })
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
