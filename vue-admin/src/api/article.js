import request from "../utils/request"

/**
 * 
 * 创建文章接口
 * 
 */
export const createArticle = (title,content)=>{
    return request({
        url : "/article/create",
        method : "POST",
        data : {
            title,
            content
        }
    })
}

/***
 * 
 *  获取所有文章接口
 * 
 * 
 */
export const ArticleList = (page = 1,size = 5)=>{
    return request({
        url : "/article/list",
        method : "get",
        params : { 
            page,
            size
        }
    })
}

/***
 * 
 * 获取文章详情接口
 * 
 */
export const ArticleDetail = (id)=>{
    return request({
        url : `/article/${id}`,
        method : 'GET',
    })
}

/***
 * 
 * 删除文章接口
 * 
 * **/
export const DeleteArticle = (id)=>{
    return request({
        url : `/article/delete/${id}`,
        method : 'get',
    })
}


/**
 * 
 * 修改文章排名接口
 * 
 */
export const ArticleRanking = (data)=>{

    return request({
        url : "/article/sort",
        method : 'POST',
        data
    })
}