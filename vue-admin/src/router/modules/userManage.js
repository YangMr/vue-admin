import Layout from "../../layout"
//员工管理的路由
export default {
    path: "/user",
    component: Layout,
    name: "userManage",
    redirect: "/user/manage",
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children: [
      {
        path: "/user/manage",
        meta: {
          title: 'userManage',
          icon: 'personnel-manage'
        },
        component: () => import("../../views/user-manage"),
      },
      {
        path: "/user/info/:id",
        meta: {
          title: 'userInfo'
        },
        component: () => import("../../views/user-info")
      },
      {
        path: '/user/import',
        component: () => import('../../views/import'),
        meta: {
          title: 'excelImport'
        }
      }
    ]
  }