import request from "../utils/request"

/**
 * 
 * 获取所有角色接口
 * 
 * */
export const roleList = ()=>{
    return request({
        url : "/role/list",
        method : "GET",
    })
}

/***
 * 
 * 获取指定角色的权限
 * 
 **/
export const rolePremissionList = (id)=>{
    return request({
        url : `/role/permission/${id}`,
        method : "get"
    })
}

/**
 * 为角色分配权限
 * 
 * ** */
export const distributePermission =(roleId,permissions)=>{
    return request({
        url :"/role/distribute-permission",
        method : "POST",
        data : {
            permissions,
            roleId
        }
        
    })
}