import {login} from "../../api/sys"
import md5 from "md5"
import {setItem,getItem} from "../../utils/storage"
import {TOKEN} from "../../constant"

export default {
    namespaced: true,

    state : ()=>({
        token : getItem(TOKEN) || ""
    }),
    
    mutations : {
        setToken(state,token){
            state.token = token;
            setItem(TOKEN,token)
        }
    },
    
   actions : {
        /**
         * 登录动作
         * **/
        login({commit},userInfo){
            let {username,password} = userInfo;
            return new Promise((resolve, reject) => {
                login({username,password: md5(password)}).then(response=>{
                    commit("setToken",response.token)
                    resolve()
                }).catch(error=>{
                    reject()
                })
            })
        }
    }
}


