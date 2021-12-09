import Layout from "../../layout"
export default {
    path : "/article",
    component : Layout,
    name : "articleRanking",
    redirect: "/article/ranking",
    meta: {
      title: 'article',
      icon: 'article'
    },
    children : [
      {
        path : "/article/ranking",
        meta: {
          title: 'articleRanking',
          icon: 'article-ranking'
        },
        component : () => import("../../views/article-ranking")
      },
      {
        path: "/article/:id",
        meta: {
          title: 'articleDetail'
        },
        component: () => import("../../views/article-detail")
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