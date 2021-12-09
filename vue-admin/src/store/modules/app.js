import { LANG } from "../../constant"
import {setItem,getItem} from "../../utils/storage"
export default {
    namespaced: true,
    state : {
        sidebarOpened : true,
        language : getItem(LANG) || "zh",
        tagsViewList : getItem("tagsView") || []
    },
    mutations : {
        triggerSidebarOpened(state){
            state.sidebarOpened = !state.sidebarOpened
        },
        /*设置国际化*/
        setLanguage(state,lang){
            state.language = lang;
            setItem(LANG,lang)
        },
        /*添加tags*/
        addTagsViewList(state,tag){
           let isFind = state.tagsViewList.find((item,index)=>{
                return item.path == tag.path
            })
            if(!isFind){
                state.tagsViewList.push(tag);
                setItem("tagsView",state.tagsViewList)
            }
        },
        /*删除tags的方法*/
        removeTagsView(state,payload){
            if(payload.type == "index"){
                state.tagsViewList.splice(payload.index,1)
            }else if(payload.type == 'other'){
                state.tagsViewList.splice(0,payload.index)
                state.tagsViewList.splice(1,state.tagsViewList.length-1)
            }else if(payload.type == 'right'){
                state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
            }
            setItem("tagsView",state.tagsViewList)
        },
    },
    actions :  {

    }
}