import { LANG } from "../../constant"
import {setItem,getItem} from "../../utils/storage"
export default {
    namespaced: true,
    state : {
        sidebarOpened : true,
        language : getItem(LANG) || "en"
    },
    mutations : {
        triggerSidebarOpened(state){
            state.sidebarOpened = !state.sidebarOpened
        },
        /*设置国际化*/
        setLanguage(state,lang){
            state.language = lang;
            setItem(LANG,lang)
        }
    },
    actions :  {

    }
}