<template>
  <div class="login-container">
    <el-form class="login-form" :model="loginForm" :rules="loginRules">
      <!-- title -->
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <!-- username -->
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          v-model="loginForm.username"
          type="text"
          placeholder="username"
        ></el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="password"
        ></el-input>
        <span class="showPwd">
          <svg-icon :icon="passwordType == 'password' ? 'eye' : 'eye-open'" @click.native="onChangePwdType"></svg-icon>
        </span>
      </el-form-item>

      <!-- button -->
      <el-form-item>
        <el-button type="primary" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    //自定义密码校验规则
    const validatePassword = (rule, value, callback) => {
      if(value.length < 6) {
        callback(new Error("密码不能小于6位"))
      }else{
        callback()
      }
    }
    return {
      //保存的是输入的username 和 password
      loginForm: {
        username: "super-admin",
        password: "123456",
      },
      //定义的是表单的校验规则
      loginRules: {
        username: [{ required: true, message: "用户名为必填项", trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
      },
      //定义密码框的type类型 type如果为text , 我们的密码则是明文状态 , type为password 密码则是密文状态 
      passwordType : "password"
    };
  },
  methods : {
    //切换密码框的状态
    onChangePwdType(){
      //当密码框的状态为password时,就让密码框的状态为文本框, 当密码框的状态不等于passowrd时候, 就密码框的状态为密码框
      this.passwordType = this.passwordType == "password" ? "text" : "password"
      // if(this.passwordType == "password"){
      //   this.passwordType = "text"
      // }else{
      //   this.passwordType = "password"
      // }
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
/*背景的颜色*/
$bg: #2d3a4b;
/*输入框图标的颜色*/
$dark_gray: #889aa4;
/*输入框文字的颜色*/
$light_gray: #eee;
/*光标的颜色*/
$cursor: #fff;

.login-container {
  width: 100%;
  min-height: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    width: 520px;
    max-width: 100%;
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;

    /*修改ui框架样式不生效时,可以使用样式穿透  scss : ::v-deep*/
    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);
      color: #454545;

      .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
          background: transparent;
          outline: none;
          border: 0;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 47px;
          caret-color: $cursor; /*设置光标的颜色*/
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 26px;
        color: $light_gray;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .showPwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
