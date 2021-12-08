import layout from "../../layout"

export default {
    path : "/user",
    component : layout,
    redirect : "/user/manage",
    name : "userManage",
    meta : { 
        title: 'user',
        icon: 'personnel'
    },
    children : [
        {
            path : "/user/manage",
            meta: {
              title: 'userManage',
              icon: 'personnel-manage'
            },
            component : ()=> import("../../views/user-manage")
        },
        {
            path: '/user/import',
            name: 'import',
            component: () => import('../../views/import/index'),
            meta: {
              title: 'excelImport'
            }
        },
        {
            path : "/user/info/:id",
            name : "userInfo",
            meta: {
              title: 'userInfo'
            },
            component: ()=> import("../../views/user-info")
          },
    ]
}