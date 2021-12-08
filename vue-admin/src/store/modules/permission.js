import router, {publicRoutes,privateRoutes} from "../../router/index"
export default {
    namespace : true,
    state : {
        routes : publicRoutes
    },
    mutations : {
        setRoutes(state,newRoutes){
            state.routes = [...publicRoutes,...newRoutes];
        }
    },
    actions : {
        filterRoutes(context,menus){
           const routes = [];
           menus.forEach(key=>{
             routes.push(...privateRoutes.filter(item=>item.name == key))
           })

           context.commit("setRoutes",routes)

           return routes;
        }
    },
}
