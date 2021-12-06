import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);

import i18n from "./i18n"

//引入全局公共样式
import "./style/index.scss";

import "./premission"

import "./icons";

Vue.config.productionTip = false;
import dayjs from "dayjs"

import Print from 'vue-print-nb'
Vue.use(Print);

// Vue.filter("formatTime", function (val){
  // if (!isNaN(val)) {
  //   val = parseInt(val)
  // }
  // return dayjs(val).format("YYYY-MM");
// })

let dateFilter = (val,format)=>{
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format);
}


import './utils/dayjs'


Vue.prototype.$dateFilter = dateFilter

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
