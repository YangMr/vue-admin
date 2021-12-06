import i18n from "../i18n/index"
import store from "../store/index"

import Vue from "vue"
let vm = new Vue()

export function generateTitle(title){
    return i18n.t('msg.route.' + title)
}



export function watchSwitchLang(callback){
    vm.$watch(() => store.getters.language,callback)
}

