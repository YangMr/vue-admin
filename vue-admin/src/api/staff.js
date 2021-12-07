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

/***
 * 
 * 新增员工(excel 导入)
 * 
 * **/
export const userBatchImport = (data)=>{
    return request({
        url : "/user-manage/batch/import",
        method : "POST",
        data
    })
}


/**
 * 
 * 员工详情接口
 * 
 * ***/

export const staffDetail = (id)=>{
    return request({
        url : `/user-manage/detail/${id}`,
        method : 'GET',
    })
}


/**
 * 
 * 获取全部用户列表数据接口
 * 
 * **/
export const getAllUser = ()=>{
    return request({
        url : `/user-manage/list?page=1&size=5`,
        method : 'GET',
    })
}

/**
 * 获取指定员工当前角色
 * ** */
 export const staffRole = (id)=>{
    return request({
        url : `/user-manage/role/${id}`,
        method : "GET"
    })
}

/**
 * 为员工分配角色
 */

export const updateStaffRole = (id,roles)=>{
    return request({
        url : `/user-manage/update-role/${id}`,
        method : "post",
        data : {
            roles 
        }
    })
}