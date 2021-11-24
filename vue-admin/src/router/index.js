import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Layout from "../layout"

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
    component: Layout,
    children : [
      {
        path : "/profile",
        name : "profile",
        meta: {
          title: 'profile',
          icon: 'el-icon-user'
        },
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
    redirect : "/user/manage",
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    component : Layout,
    children : [
      {
        path : "/user/manage",
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        },
        component : ()=> import("../views/user-manage")
      },
      {
        path : "/user/role",
        meta: {
          title: 'roleList',
          icon: 'role'
        },
        component: ()=> import("../views/role-list")
      },
      {
        path : "/user/permission",
        meta: {
          title: 'permissionList',
          icon: 'permission'
        },
        
        component: ()=> import("../views/permission-list")
      },
      {
        path : "/user/info/:id",
        name : "userInfo",
        meta: {
          title: 'userInfo'
        },
        component: ()=> import("../views/user-info")
      },
      {
        path: '/user/import',
        name: 'import',
        component: () => import('@/views/import/index'),
        meta: {
          title: 'excelImport'
        }
      }
      
    ]
  },
  {
    path : "/article",
    component : ()=> import("../layout"),
    redirect : "/article/ranking",
    meta: {
      title: 'article',
      icon: 'article'
    },
    children : [
      {
        path : "/article/ranking",
        name : "articleRanking",
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        },
        component : ()=> import("../views/article-ranking")
      },
      {
        path : "/article/create",
        name : "articleCreate",
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        },

        component : ()=> import("../views/article-create")
      },
      {
        path : "/article/:id",
        name : "article",
        meta: {
          title: 'articleDetail'
        },
        component : ()=> import("../views/article-detail")
      },
      {
        path: '/article/editor/:id',
        component: () => import('@/views/article-create/index'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes: [...publicRoutes, ...privateRoutes],
});
console.log(router.options.routes)

export default router;
