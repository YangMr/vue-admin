<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
      unique-opened
      router
    >
      <sidebar-item v-for="(item) in menus" :key="item.path" :route="item"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue"
import {filterRouters,generateMenus} from "../../../utils/route"
export default {
  name: "",
  data() {
    return {
      routes : [],
    };
  },
  created(){
    // 1. 获取到路由表
    this.routes = this.$router.options.routes
  },
  computed : {
      menus(){
        return generateMenus(this.routes)
      }
  },
  components: {
    SidebarItem
  },
};
</script>

<style scoped></style>
