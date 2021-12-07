import request from "../utils/request"

/**
 * 
 * 获取项目功能接口
 * 
 * **/

export const feature = ()=>{
    return request({
        url : "/user/feature",
        method : "GET"
    })
}

/**
 * 
 * 获取项目章节接口
 * 
 * **/

 export const chapter = ()=>{
    return request({
        url : "/user/chapter",
        method : "GET"
    })
}

