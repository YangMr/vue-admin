import request from "../utils/request"

/**
 *  
 * 获取员工列表接口
 * ***/

export const getStaffList = (page,size)=>{
    return request({
        url : `/user-manage/list?page=${page}&size=${size}`,
        method : "GET"
    })
}

/***
 * 
 * 删除指定员工接口
 * 
 * **/

export const deleteStaff = (id)=>{
    return request({
        url : `/user-manage/detele/${id}`,
        method : "GET"
    })
}