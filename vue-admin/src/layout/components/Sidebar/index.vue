<template>
 <div class="sidebar-container" :style="{background:variables.menuBg}">
    <div class="logo-container">
        <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
        <span v-if="$store.getters.sidebarOpened" class="logo-title">imooc-admin</span>
    </div>
    <el-scrollbar>
        <sidebar-menu></sidebar-menu>
    </el-scrollbar>
 </div>
</template>

<script>
import variables from "../../../style/variables.scss"
import SidebarMenu from "./SidebarMenu.vue"
export default {
 name : "", 
 data(){
  return {
     variables
  }
 },
 components : {
     SidebarMenu
 },
}
</script>


<style scoped lang="scss">
.logo-container{
    display : flex; 
    align-items: center;
    justify-content: center;
    height: 44px;
    padding:10px 0 22px 0;

    .logo-title{
        color : #fff;
        margin-left:10px;
        font-weight: 600;
        line-height: 50px;
        font-size: 16px;
        white-space: nowrap;
    }
}
</style>