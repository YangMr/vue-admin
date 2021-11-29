<template>
  <div class="navbar">
    <hamburger class="hamburger-container"></hamburger>
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <screen-full class="right-menu-item"></screen-full>
      <lang-select class="right-menu-item"></lang-select>
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
            <el-dropdown-item>{{$t('msg.navBar.home')}}</el-dropdown-item>
          </router-link>
          <a href="/" target="_blank">
            <el-dropdown-item>{{$t('msg.navBar.course')}}</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">{{$t('msg.navBar.logout')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import hamburger from "../../components/hamburger.vue"
import breadcrumb from "../../components/Breadcrumb/index.vue"
import LangSelect from "../../components/LangSelect/index.vue"
import ScreenFull from "../../components/ScreenFull/index.vue"

export default {
  name: "",
  data() {
    return {};
  },
  methods : {
      logout(){
          this.$store.dispatch("user/logout")
      }
  },
  components: {
    hamburger,
    breadcrumb,
    LangSelect,
    ScreenFull
  },
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


        .right-menu-item{
            display: inline-block;
            padding: 0 18px 0 0;
            font-size: 24px;
            color: #5a5e66;
            vertical-align: text-bottom;
            cursor: pointer;
        }
    }

    .hamburger-container{
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.5s;

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .breadcrumb-container{
      float : left;
      line-height: 46px;
      height: 100%;
    }


}
</style>
