import Layout from "../../layout"
export default {
    path : "/user",
    component : Layout,
    redirect : "/user/manage",
    name : "permissionList",
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children : [
      {
        path : "/user/permission",
        meta: {
          title: 'permissionList',
          icon: 'permission'
        },
        component: () => import("../../views/permission-list")
      }
    ]
  }