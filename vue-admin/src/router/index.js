import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";

Vue.use(VueRouter);

/**
 *  路由分为两种:
 *        静态路由
 *            不需要权限验证的路由(不管任意用户登录之后都等访问到的路由地址)
 *        动态路由
 *            根据用户角色权限从后台返回出来的路由,我们称之为动态路由
 *
 * ***/

//公开路由表
const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  routes: publicRoutes,
});

export default router;
