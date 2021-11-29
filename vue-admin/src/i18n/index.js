//1. 引入i8n
import VueI18n from 'vue-i18n'
import Vue from "vue"
import store from "../store"

//引入自定义的语言包
import zh from "./lang/zh"
import en from "./lang/en"

//处理element 国际化
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'


//2. 创建数据
const messages = {
    en: {
      msg: {
        ...en
      },
      ...enLocale
    },
    zh: {
      msg: {
        ...zh
      },
      ...zhLocale
    }
  }

//3. 控制语言切换的环境变量
const locale =  store.getters.language;

//4. 注册i8n
Vue.use(VueI18n)

//5. 初始化i18n
let i18n = new VueI18n({
    messages,
    locale,
    silentTranslationWarn: true,
})



ElementLocale.i18n((key, value) => i18n.t(key, value))

//6. 导出i18n的实例对象
export default i18n