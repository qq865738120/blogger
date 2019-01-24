<template>
  <div class="sign-from-root">
    <el-form :model="signForm" status-icon :rules="rules" ref="signForm" class="demo-ruleForm">
      <el-form-item :label="$t('signinPage.form.name')" prop="name">
        <el-input type="text" v-model="signForm.name" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item :label="$t('signinPage.form.passwd')" prop="pass">
        <el-input type="password" v-model="signForm.pass" autocomplete="off" max="30"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button size="large" class="submit-button" type="primary" @click="submitForm('signForm')">{{ $t('signinPage.form.signIn') }}</el-button>
      </el-form-item>
    </el-form>
    <p class="sign-tip font-small">{{ $t('signinPage.form.signUpTip') }}<nuxt-link to="/signup">{{ $t('signinPage.form.toSignUp') }}</nuxt-link></p>
    <div class="margin-top-40 flex-col-center">
      <p class="font-medium color-base-black-2">第三方账号登录</p>
      <third-login></third-login>
    </div>
  </div>
</template>

<script>
import ThirdLogin from '~/components/ThirdLogin.vue'

export default {
  components: {
    ThirdLogin
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    return {
      signForm: {
        pass: '',
        name: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
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
