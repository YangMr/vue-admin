import variables from "../style/variables.scss"
export const getters = {
    token : state => state.user.token,
    hasUserInfo : state => {
        return state.user.userInfo
    },
    userInfo :  state => state.user.userInfo,
    cssVar : state => variables,
    sidebarOpened : state => state.app.sidebarOpened,
    language : state => state.app.language
}