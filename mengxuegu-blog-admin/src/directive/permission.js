// 自定义权限指令
import store from '@/store'

export default {
    // 指令钩子
    inserted(el, binding) {
        // el 指定作用到哪个元素上
        // 获取使用指令时传递的值
        const {value} = binding
        // 获取用户当前所拥有的所有按钮权限
        const buttonList = store.getters && store.getters.buttonList
        if(value) {
            // some 遇到 return true 时会结束数组遍历
            const hasPermission = buttonList.some(button => {
                return button === value
            })
            // 如果没有权限, 将元素移除
            if(!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el)
            }
        }else {
            throw new Error(`需要指定权限标识！比如 v-permisson="'aritcle:delete'"`)
        }
    }
}