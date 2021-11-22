/**
 * 引入请求文件
 * **/
import axios from "axios"
import request from "../utils/request"

/**
 * 
 * 登录接口
 *  
 * ***/

export const login = (data) => {
    return request({
        url : "/sys/login",
        method : "POST",
        data
    })
}




/**
 * 
 * 获取用户信息接口
 *  
 * ***/
export const getUserInfo = ()=>{
    return request({
        url : "/sys/profile",
        method : "GET"
    })
}

