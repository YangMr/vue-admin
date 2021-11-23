import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";

Vue.use(VueRouter);


//公开路由表
const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "layout",
    redirect : "/profile",
    component: ()=> import("../layout"),
    children : [
      {
        path : "/profile",
        name : "profile",
        component: ()=> import("../views/profile")
      },
      {
        path : "/404",
        name : "404",
        component: ()=> import("../views/error-page/404.vue")
      },
      {
        path : "/401",
        name : "401",
        component: ()=> import("../views/error-page/401.vue")
      }
    ]
  }
];

//私有路由表
const privateRoutes = [
  {
    path : "/user",
    name : "user",
    redirect : "/user/manage",
    component : ()=> import("../layout"),
    children : [
      {
        path : "/user/manage",
        name : "userManage",
        component : ()=> import("../views/user-manage")
      },
      {
        path : "/user/role",
        name : "userRole",
        component: ()=> import("../views/role-list")
      },
      {
        path : "/user/permission",
        name : "userPermission",
        component: ()=> import("../views/permission-list")
      },
      {
        path : "/user/info/:id",
        name : "userInfo",
        component: ()=> import("../views/user-info")
      }
      
    ]
  },
  {
    path : "/article",
    component : ()=> import("../layout"),
    redirect : "/article/ranking",
    children : [
      {
        path : "/article/ranking",
        name : "articleRanking",
        component : ()=> import("../views/article-ranking")
      },
      {
        path : "/article/create",
        name : "articleCreate",
        component : ()=> import("../views/article-create")
      },
      {
        path : "/article/:id",
        name : "article",
        component : ()=> import("../views/article-detail")
      }
    ]
  }
]

const router = new VueRouter({
  routes: [...publicRoutes,...privateRoutes],
});

export default router;
