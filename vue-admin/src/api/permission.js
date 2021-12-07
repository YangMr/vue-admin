import request from "../utils/request"

/**
 * 
 * 获取所有权限接口
 * 
 * */
export const permissionList = ()=>{
    return request({
        url : "/permission/list",
        method : "GET",
    })
}