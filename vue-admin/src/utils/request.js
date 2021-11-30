import axios from "axios"
import store from "../store"
import { Message } from 'element-ui';
import {isCheckTimeout} from "./auth"
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(function (config) {
    //通过请求拦截器,请token发送给后台
    if(store.getters.token){
        if(isCheckTimeout()){
            store.dispatch("user/logout");
            return Promise.reject(new Error('token 失效'))
        }
        config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    config.headers["Accept-Language"] = store.getters.language

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(function (response) {
    let {success,message,data,code} = response.data;
    if(success) {
        return data
    }else{
        Message.error(message)
        return Promise.reject(new Error(message))
    }
    return response;
}, function (error) {
    //token过期的处理
    if(error.response && error.response.data && error.response.data.code == 401){
        //退出登录
        store.dispatch("user/logout")
    }

    Message.error(error.message)
    return Promise.reject(error);
});

export default service