<template>
 <div class="sidebar-container" :style="{background:variables.menuBg}">
    <h1>占位</h1>
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


<style scoped>

</style>