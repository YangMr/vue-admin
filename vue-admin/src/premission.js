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
const whiteList = ["/login","/404","/401"]

router.beforeEach(async (to,from,next)=>{
    if(store.getters.token){
        //登录
        if(to.path == "/login"){
            next("/")
        }else{
            //用户已经登录了,访问的也不是登录页 
            if(store.getters.hasUserInfo){
                next()
            }else{
               const res =  await store.dispatch("user/getUserInfo");
               //menus数据的内容是 当前这个用户所需要的路由
               let menus = res.permission.menus;

               const routes = await store.dispatch("permission/filterRoutes",menus);

               routes.forEach(item=>{
                   router.addRoute(item)
               })

               next(to.path)
            }
        }
    }else{
        //未登录
        if(whiteList.indexOf(to.path) > -1){
            next()
        }else{
            next("/login")
        }
    }
})