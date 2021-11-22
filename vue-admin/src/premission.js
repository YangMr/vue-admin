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
            if(store.getters.hasUserInfo){
                next()
            }else{
                await store.dispatch("user/getUserInfo");
                next()
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