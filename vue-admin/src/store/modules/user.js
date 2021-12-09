import {login,getUserInfo} from "../../api/sys"
import md5 from "md5"
import router,{resetRouter} from "../../router"
import {setItem,getItem,removeAllItem} from "../../utils/storage"
import {TOKEN,USERINFO} from "../../constant"

export default {
    namespaced: true,

    state : ()=>({
        token : getItem(TOKEN) || "",
        userInfo : getItem(USERINFO) || ""
    }),
    
    mutations : {
        setToken(state,token){
            state.token = token;
            setItem(TOKEN,token)
        }, 
        setUserInfo(state,userInfo){
            state.userInfo = userInfo;
            // setItem(USERINFO,userInfo)
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
        },

        /**
         * 获取用户信息
         * **/
        async getUserInfo({commit}){
            const res = await getUserInfo();
            commit("setUserInfo",res)
            return res;
        },

         /**
         * 退出登录
         * **/
        async logout({commit}){
            
            commit("setToken","");
            commit("setUserInfo","")
            removeAllItem()
            resetRouter()
            // window.location.href = "/login"
            router.push("/login")
        }
    }
}


