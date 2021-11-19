import axios from "axios"
import { Message } from 'element-ui';
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

//请求拦截器
service.interceptors.request.use(function (config) {
    // Do something before request is sent
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
    Message.error(error.message)
    return Promise.reject(error);
});

export default service