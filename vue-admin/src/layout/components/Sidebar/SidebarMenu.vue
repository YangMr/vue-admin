<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#ffffff"
      unique-opened
      router
    >
      <sidebar-item v-for="(item) in routes" :key="item.path" :route="item"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem.vue"
export default {
  name: "",
  data() {
    return {
      routes: [
        {
          path: "/profile",
          name: "profile",
          meta: {
            title: "个人中心",
            icon: "el-icon-user",
          },
        },
        {
          path: "/user",
          redirect: "/user/manage",
          meta: {
            title: "用户",
            icon: "personnel",
          },
          props: {
            default: false,
          },
          children: [
            {
              path: "/user/manage",
              name: "userManage",
              meta: {
                title: "员工管理",
                icon: "personnel-manage",
              },
              children: [
              ],
            },
            {
              path: "/user/role",
              name: "userRole",
              meta: {
                title: "角色列表",
                icon: "role",
              },
              children: [],
            },
            {
              path: "/user/permission",
              name: "userPermission",
              meta: {
                title: "权限列表",
                icon: "permission",
              },
              children: [],
            },
          ],
        },
        {
          path: "/article",
          redirect: "/article/ranking",
          meta: {
            title: "文章",
            icon: "article",
          },
          props: {
            default: false,
          },
          children: [
            {
              path: "/article/ranking",
              name: "articleRanking",
              meta: {
                title: "文章排名",
                icon: "article-ranking",
              },
              children: [],
            },
            {
              path: "/article/create",
              name: "articleCreate",
              meta: {
                title: "创建文章",
                icon: "article-create",
              },
              children: [],
            },
          ],
        },
      ],
    };
  },
  created(){
    console.log(this.menu)
  },
  components: {
    SidebarItem
  },
};
</script>

<style scoped></style>
