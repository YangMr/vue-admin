<template>
  <div >
    <el-menu
      :collapse="!$store.getters.sidebarOpened"
      :default-active="$route.path"
      :background-color="$store.getters.cssVar.menuBg"
      :text-color="$store.getters.cssVar.menuText"
      :active-text-color="$store.getters.cssVar.menuActiveText"
      :unique-opened="true"
      collapse-transition
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
    // this.routes = this.$router.options.routes

    // this.$router.options.routes

    // this.$router.getRoutes()

    // console.log("111",this.$router.options.routes)
    // console.log("222",this.$router.getRoutes())

    //将完整路由表的数据转化成菜单所需要的数据结构,转化完成之后交给el-menu进行渲染
    this.routes = this.$router.getRoutes()

  },
  computed : {
      menus(){
        return this.filterMenu(this.routes)
      }
  },
  methods : {
    filterMenu(routes){
      //筛选出一级路由和二级路由的菜单数据(有meta , meta里面有title 有icon的数据)
      const newRoutes = routes.filter(item=>item.meta && item.meta.title && item.meta.icon);
      return this.generateFilterMenus(newRoutes)
    },
    generateFilterMenus(newRoutes){
      let parent = newRoutes.filter(item=>item.name),
          children = newRoutes.filter(item=>!item.name)

      dataToTree(parent,children)
      //parent 3  children 5
      function dataToTree(parent,children){
        parent.map(p=>{   
          //p.path   /profile /user /article
          children.map((c,index)=>{

              //c.parent.path      /user /article
                // /user 
              if(p.path == c.parent.path){
                
                if(p.children){
                  p.children.push(c)
                }else{
                  p.children = [c]
                }

              }
          })
        })
      }

      return parent
    }
  },
  components: {
    SidebarItem
  },
};
</script>

<style scoped></style>
