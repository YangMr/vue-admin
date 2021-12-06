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