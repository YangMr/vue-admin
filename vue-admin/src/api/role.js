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