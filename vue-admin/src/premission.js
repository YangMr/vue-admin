/**
 * 
 * 登录鉴权
 * 
 *  to : 去哪里
 *  from : 从哪来
 *  next : 是否进入
 *  
 * ***/

import router from "./router"
import store from "./store"

//定义一个白名单
const whiteList = ["/login", "/404", "/401"]
let permission = null;
let flag = false;
router.beforeEach(async (to, from, next) => {

    if (store.getters.token) {
        //登录
        if (to.path == "/login") {
            next("/")
        } else {
       
            if (store.getters.hasUserInfo) {
                next()
            } else {
                let res = await store.dispatch("user/getUserInfo");

                const filterRoutes = await store.dispatch("filterRoutes", res.permission.menus)
                router.options.routes = []
                filterRoutes.forEach(item => {
                    router.addRoute(item)
                })
                router.options.routes = router.getRoutes();
                return next(to.path)
            }
        }
    } else {
        //未登录
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next("/login")
        }
    }
})



