// 引入所有要注册的全局指令
import permission from './permission'

export default (Vue) => {
    // 第1个参数是指令名，v-permission 使用，而在声明指令名时候不能加 v-
    Vue.directive('permission', permission)
}
