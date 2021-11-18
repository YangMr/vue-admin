<template>
  <div class="login-container">
    <el-form class="login-form">
      <!-- title -->
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <!-- username -->
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input type="text" placeholder="username"></el-input>
      </el-form-item>

      <!-- password -->
      <el-form-item>
        <span class="svg-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input type="password" placeholder="password"></el-input>
        <span class="showPwd">
          <svg-icon icon="eye" ></svg-icon>
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
/**
 * 
 * 
 *  1. 在vue项目中使用element-ui的内置图标
 *        <span class="svg-container">
                <i class="el-icon-remove"></i>
            </span>
 * 
 *  2. 在vue项目中使用阿里巴巴适量图标库的图标
 * 
 *      2.1 下载到本地的使用方法
 *          https://blog.csdn.net/tt18473481961/article/details/108065846
 * 
 *      
 * 
 *  3. 使用svg图标
 * 
 *      1. 核心思路:  
 *          1.1 创建一个SvgIcon组件
 *          1.2 通过SvgIcon组件可以加载外部的svg图标以及项目内的svg图标
 *          1.3 封装一个验证方法来判断当前图标时外部图标 还是 项目内的图标
 *          export function isExternal(path) {
              return /^(https?:|mailto:|tel:)/.test(path);
            }
            1.4 在SvgIcon组件通过isExternal来接受icon,进行验证
            1.5 创建外部图标展示方式
               <div v-if="isExternal" class="svg-external-icon svg-icon" :style="styleExternalIcon" :class="className"></div>
            1.6 创建内部图标展示方式
              <svg v-else class="svg-icon" :class="className" aria-hidden="true">
                 <use :xlink:href="iconName" />
              </svg>
            1.7 定义svg图标掩饰
                svg-icon {
                  width: 1em;
                  height: 1em;
                  vertical-align: -0.15em;
                  fill: currentColor;
                  overflow: hidden;
                }

                .svg-external-icon {
                  background-color: currentColor;
                  mask-size: cover !important;
                  display: inline-block;
                }  

            1.8 在src目下创建icons文件夹,在改文件夹内倒入svg的所有图标
            1.9 在icons目录下创建index.js
            1.10 加载svg目录下的所有svg图标,并将svgIcon注册为全局组件
            1.11 在vue.config.js里面配置svg loader
            1.12 使用svg图标    
 * 
 *  
 *      3.1 使用外部的svg图标
 *          通过在线的地址引入的图标
 * 
 *      3.2 使用内部的svg图标
 *          svg图标下载到本地了,在项目使用本地的svg图标
 * 
 * **/

export default {
  name: "",
  data() {
    return {};
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
