<template>
  <div class="navbar">
    <div class="right-menu">
      <el-dropdown trigger="click" class="avatar-container">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <el-dropdown-menu slot="dropdown" >
          <router-link to="/a">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <a href="/" target="_blank">
            <el-dropdown-item>课程主页</el-dropdown-item>
          </a>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  components: {},
};
</script>

<style scoped lang="scss">
.navbar{
    height:50px;
    background-color:#fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    overflow: hidden;
    position: relative;

    .right-menu{
        float: right;
        display : flex;
        align-items : center;
        padding-right:16px;

        .avatar-container{
            cursor: pointer;

            .avatar-wrapper{
                margin-top:5px;
                position: relative;
                .el-avatar{
                    background: none;
                    margin-right:12px;
                }
            }
        }
    }
}
</style>
