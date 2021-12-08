import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";
import Layout from "../layout"
import store from "../store"

Vue.use(VueRouter);

import articleCreate from "./modules/articleCreate"
import articleRanking from "./modules/articleRanking"
import PermissionList from "./modules/PermissionList"
import RoleList from "./modules/RoleList"
import UserManage from "./modules/UserManage"

//公开路由表
export const publicRoutes = [
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
      },
      {
        path : "/test",
        name : "test",
        component: ()=> import("../views/Test/index.vue")
      }
    ]
  }
];

//私有路由表
export const privateRoutes  =[
  articleCreate,
  articleRanking,
  PermissionList,
  RoleList,
  UserManage
]

// const privateRoutes = [
//   {
//     path : "/user",
//     redirect : "/user/manage",
//     meta: {
      // title: 'user',
      // icon: 'personnel'
//     },
//     component : Layout,
//     children : [
      // {
      //   path : "/user/manage",
      //   meta: {
      //     title: 'userManage',
      //     icon: 'personnel-manage'
      //   },
      //   component : ()=> import("../views/user-manage")
      // },
//       {
//         path : "/user/role",
//         meta: {
//           title: 'roleList',
//           icon: 'role'
//         },
//         component: ()=> import("../views/role-list")
//       },
//       {
//         path : "/user/permission",
//         meta: {
          // title: 'permissionList',
          // icon: 'permission'
//         },
        
//         component: ()=> import("../views/permission-list")
//       },
      // {
      //   path : "/user/info/:id",
      //   name : "userInfo",
      //   meta: {
      //     title: 'userInfo'
      //   },
      //   component: ()=> import("../views/user-info")
      // },
      // {
      //   path: '/user/import',
      //   name: 'import',
      //   component: () => import('@/views/import/index'),
      //   meta: {
      //     title: 'excelImport'
      //   }
      // }
      
//     ]
//   },
//   {
//     path : "/article",
//     component : ()=> import("../layout"),
//     redirect : "/article/ranking",
//     meta: {
      // title: 'article',
      // icon: 'article'
//     },
//     children : [
//       {
//         path : "/article/ranking",
//         name : "articleRanking",
//         meta: {
          // title: 'articleRanking',
          // icon: 'article-ranking'
//         },
//         component : ()=> import("../views/article-ranking")
//       },
//       {
//         path : "/article/create",
//         name : "articleCreate",
//         meta: {
          // title: 'articleCreate',
          // icon: 'article-create'
//         },

//         component : ()=> import("../views/article-create")
//       },
      // {
      //   path : "/article/:id",
      //   name : "article",
      //   meta: {
      //     title: 'articleDetail'
      //   },
      //   component : ()=> import("../views/article-detail")
      // },
//       {
//         path: '/article/editor/:id',
//         component: () => import('@/views/article-create/index'),
//         meta: {
//           title: 'articleEditor'
//         }
//       }
//     ]
//   }
// ]

export function resetRouter() {
  var options = publicRoutes
  var _VueRouter = new VueRouter(options)
  router.matcher = _VueRouter.matcher
}

const router = new VueRouter({
  routes: publicRoutes
});



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



export default router


/***
 * 
 * 
 * 
 * 完成动态路由的添加:
 *    
 *  1. 在前端自定以一份私有路由表
 *    
 * 
 *  2. 根据后台返回的路由权限 去 匹配 自定义的私有路由表
 * 
 *  3. 如果后台返回的路由权限 在 自定义的私有路由表中能够匹配到
 * 
 *  4. 我们则通过router.addRoute的方法私有路由添加到路由表中
 * 
 * 
 * **/