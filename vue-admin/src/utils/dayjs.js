import Vue from 'vue'
import dayjs from 'dayjs'
import store from "../store/index"
import {watchSwitchLang} from "./i18n"

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale(store.getters.language == 'zh'? 'zh-cn' : 'en')

watchSwitchLang(function(){
  dayjs.locale(store.getters.language == 'zh'? 'zh-cn' : 'en')
})

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  if (!isNaN(value)) {
    value = parseInt(value)
  }
  return dayjs().to(dayjs(value))
})

export default dayjs
