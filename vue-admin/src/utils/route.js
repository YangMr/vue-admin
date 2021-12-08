import path from "path"
//去除所有不包含children的数据,并且获取包含children的数据里面所有的子数据
// export let getChildrenRoutes = (routes)=>{
//     let result = [];

//     routes.forEach((item,index)=>{
//         if(item.children && item.children.length > 0){
//             result.push(...item.children)
//         }
//     })
//     return result;
// }


// //获取所有一级路由并且包含chidlren的数据
// export let filterRouters = (routes)=>{
//     let childrenRoutes = getChildrenRoutes(routes);
//     return routes.filter((item,index)=>{
//        return !childrenRoutes.find(childrenRoute=>{
//            return  childrenRoute == item.path
//         })
//     })
// }

//检测一个变量内容是为空 , 如果为空则返回true , 否则为false
export function isNull(data){
    if(!data) return true;
    if(JSON.stringify(data) == "{}") return true;
    if(JSON.stringify(data) == "[]") return true;
    return false;
}

//将所有一级路由并且包含chidlren的数据处理成菜单所需要的数据
export let generateMenus = (routes,basePath="")=>{
    let result = [];

    routes.forEach((item,index)=>{
        if(isNull(item.meta) && isNull(item.children)) return;

        if(isNull(item.meta) && !isNull(item.children)){
            result.push(...generateMenus(item.children))
            return;
        }

        let routePath = path.resolve(basePath, item.path);

        let route = result.find((m,i)=>{m.path == routePath});

        if(!route){
            route = {
                ...item,
                path : routePath,
                children : []
            }
            if(route.meta.title && route.meta.icon){
                result.push(route)
            }
            
        }

        if(item.children){
            route.children.push(...generateMenus(item.children,route.path))
        }
    })

    return result;
}