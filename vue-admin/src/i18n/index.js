//1. 引入i8n
import VueI18n from 'vue-i18n'
import Vue from "vue"
import store from "../store"
//2. 创建数据源

const messages = {
    en: {
      msg: {
        test: 'hello world'
      }
    },
    zh: {
      msg: {
        test: '你好世界'
      }
    }
  }

//3. 控制语言切换的环境变量
const locale = store.getters.language


//4. 注册i8n
Vue.use(VueI18n)

//5. 初始化i18n
let i18n = new VueI18n({
    messages,
    locale
})

//6. 导出i18n的实例对象
export default i18n