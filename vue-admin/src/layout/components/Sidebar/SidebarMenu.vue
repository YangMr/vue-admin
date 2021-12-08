<template>
  <div>
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
      <sidebar-item v-for="item in menus" :key="item.path" :route="item"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue";
import { filterRouters, generateMenus } from "../../../utils/route";
export default {
  name: "",
  data() {
    return {
      routes: [],
    };
  },
  created() {
    // 1. 获取到路由表
    this.routes = this.$router.options.routes;
  },
  computed: {
    menus() {
      return this.formatRouter(this.routes);
    },
  },
  methods: {
    formatRouter(routes){
      const newRouter = routes.filter(item=> item.meta && item.meta.title && item.meta.icon)
      return this.generateRouter(newRouter)
    },
    generateRouter(newRouter){
      //获取一级  和 二级路由
      let parent = newRouter.filter(item=>item.name),
          children = newRouter.filter(item=>!item.name)

          dataToTree(parent,children)

          function dataToTree(parent,children){

            parent.map(p=>{

              children.map(c=>{
                if(p.path == c.parent.path){

                  dataToTree([c],children)

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
    },
   
  },
  components: {
    SidebarItem,
  },










  // formatRouter(routes) {
    //   let newRouter = routes.filter((item) => {
    //     return item.meta && item.meta.title && item.meta.icon;
    //   });
    //   return this.generateTree(newRouter);
    // },
    // generateTree(newRouter) {
    //   let parents = newRouter.filter((p) => p.name),
    //     children = newRouter.filter((c) => !c.name);
    //   dataToTree(parents, children);
    //   function dataToTree(parents, children) {
    //     parents.map((p) => {
    //         children.map((c, i) => {
    //           if (c.parent.path === p.path) {
    //             dataToTree([c], children);
    //             if (p.children) {
    //               p.children.push(c);
    //             } else {
    //               p.children = [c];
    //             }
    //           }
    //       });
    //     });
    //   }
    //   return parents
    // },
};
</script>

<style scoped>
.el-menu--collapse .el-submenu__title span {
  display: none;
}
</style>
