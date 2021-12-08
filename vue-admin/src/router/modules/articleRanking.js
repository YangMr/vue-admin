import layout from "../../layout"

export default {
    path: "/article",
    component: layout,
    redirect: "/article/ranking",
    name: "articleRanking",
    meta: {
        title: 'article',
        icon: 'article'
    },
    children: [
        {
            path: "/article/ranking",
            meta: {
                title: 'articleRanking',
                icon: 'article-ranking'
            },
            component: () => import("../../views/article-ranking")
        },
        {
            path: "/article/:id",
            meta: {
                title: 'articleDetail'
            },
            component: () => import("../../views/article-detail")
        },
    ]
}