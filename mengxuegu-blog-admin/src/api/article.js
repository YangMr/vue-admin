import request from '@/utils/request'

export default {

    // 分页条件查询文章列表
    getList(query, current = 1, size = 20) {
        return request({
            url: `/article/article/search`,
            method: 'post',
            data: {...query, current, size}
        })
    },

    // 查询文章详情
    getById(id) {
        return request({
            url: `/article/article/${id}`,
            method: 'get'
        })
    },

    // 文章审核通过
    auditSuccess(id) {
        return request({
            url: `/article/article/audit/success/${id}`,
            method: 'get'
        })
    },

    // 文章审核未通过
    auditFail(id) {
        return request({
            url: `/article/article/audit/fail/${id}`,
            method: 'get'
        })
    },

    // 删除
    deleteById(id) {
        return request({
            url: `/article/article/${id}`,
            method: 'delete'
        })
    }

}