<template>
  <div class="sign-from-root">
    <el-form :model="signForm" status-icon :rules="rules" ref="signForm" class="demo-ruleForm">
      <el-form-item :label="$t('signupPage.form.name')" prop="name">
        <el-input type="text" v-model="signForm.username" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('signupPage.form.passwd')" prop="pass">
        <el-input type="password" v-model="signForm.passwd" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('signupPage.form.rePasswd')" prop="rePass">
        <el-input type="password" v-model="signForm.rePass" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button size="large" class="submit-button" type="primary"  @keyup.enter="submitForm('signForm')" @click="submitForm('signForm')">{{ $t('signupPage.form.signUp') }}</el-button>
      </el-form-item>
    </el-form>
    <p class="sign-tip font-small">{{ $t('signupPage.form.signInTip') }}<nuxt-link to="/signin">{{ $t('signupPage.form.toSignIn') }}</nuxt-link></p>
  </div>
</template>

<script>
import ThirdLogin from '~/components/ThirdLogin.vue'
let nameTip = '';
let passwdTip = '';
let passwdTip2 = '';
let passwdTip3 = '';

export default {
  components: {
    ThirdLogin
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(passwdTip));
      } else {
        callback();
      }
    };
    var validateRePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(passwdTip2));
      } else if (value !== this.signForm.passwd) {
        callback(new Error(passwdTip3));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(nameTip));
      } else {
        callback();
      }
    };
    return {
      signForm: {
        passwd: '',
        rePass: '',
        username: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        rePass: [
          { validator: validateRePass, trigger: 'blur' },
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    nameTip = this.$t('signupPage.form.nameTip')
    passwdTip = this.$t('signupPage.form.passwdTip')
    passwdTip2 = this.$t('signupPage.form.passwdTip2')
    passwdTip3 = this.$t('signupPage.form.passwdTip3')
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let loading = this.$utils.loading(this)
          this.$axios.post('/api/v1/registered', this.signForm).then(res => {
            console.log('registered注册接口', res.data);
            let type = 'error'
            if (res.data.code == 200) { //注册成功
              type = 'success'
              this.$utils.doLogin(this, this.signForm, () => {
                loading.close()
              })
            } else {
              loading.close()
            }
            this.$message({
              message: res.data.msg,
              type
            });
          })
        }
      });
    }
  }
}
</script>

<style scoped lang="scss" >
@import 'assets/style/common';

.sign-from-root {
  width: 440px;
  background-color: white;
  padding: 50px;
  border-radius: 4px;
  box-shadow: 0 0 30px 3px $--color-main-light-3;
}
.submit-button {
  width: 100%;
  margin-top: $--px30;
}
.sign-tip {
  color: $--color-sub-black;
}
</style>
