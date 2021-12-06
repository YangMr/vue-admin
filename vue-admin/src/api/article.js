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