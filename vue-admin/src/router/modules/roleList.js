import Layout from "../../layout"
export default {
    path : "/user",
    component : Layout,
    redirect : "/user/manage",
    name : "roleList",
    meta: {
      title: 'user',
      icon: 'personnel'
    },
    children : [
      {
        path : "/user/role",
        meta: {
          title: 'roleList',
          icon: 'role'
        },
        component : () => import("../../views/role-list")
      }
    ]
  }