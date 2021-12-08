<template>
 <fragment>
      <el-submenu :index="route.path" v-if="route.children && route.children.length > 0">
        <template slot="title">
            <menu-item :icon="route.meta.icon" :title="route.meta.title"></menu-item>
        </template>
        <sidebar-item v-for="(item) in route.children" :key="item.path" :route="item"></sidebar-item>
      </el-submenu>
      <el-menu-item  :index="route.path" v-else>
        <menu-item :icon="route.meta.icon" :title="route.meta.title"></menu-item>
     </el-menu-item>
</fragment>
</template>

<script>
import MenuItem from "./MenuItem.vue"
export default {
 name : "SidebarItem", 
 props : {
     route: {
         type : Object,
         required : true
     }
 },
 data(){
  return {

  }
 },
 components : {
     MenuItem
 },
}
</script>


<style scoped lang="scss">

</style>