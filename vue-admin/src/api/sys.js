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




