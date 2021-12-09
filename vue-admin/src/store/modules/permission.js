import {publicRoutes,privateRoutes} from "../../router"
export default {
    namespaced: true,
    state : {
        routes : []
    },
    mutations : {
        setRoutes(state,newRouter){
            state.routes.push(...publicRoutes,...newRouter)
        }
    },
    actions : {
        filterRoutes({commit},menus){
            let routes = [];

            menus.forEach(key=>{
                routes.push(...privateRoutes.filter(item=>item.name == key))
            })

            routes.push({
                path : "/:catchAll(.*)",
                redirect: "/404"
            })


            commit("setRoutes",routes)

            return routes;
        }
    }
}