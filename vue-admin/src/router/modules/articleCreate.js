import Layout from "../../layout"
export default {
    path : "/article",
    component : Layout,
    name : "articleCreate",
    redirect: "/article/ranking",
    meta: {
      title: 'article',
      icon: 'article'
    },
    children : [
      {
        path : "/article/create",
        meta: {
          title: 'articleCreate',
          icon: 'article-create'
        },
        component: () => import("../../views/article-create")
      },
      {
        path: '/article/editor/:id',
        component: () => import('../../views/article-create'),
        meta: {
          title: 'articleEditor'
        }
      }
    ]
  }