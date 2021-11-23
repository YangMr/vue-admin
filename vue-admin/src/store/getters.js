export const getters = {
    token : state => state.user.token,
    hasUserInfo : state => {
        return state.user.userInfo
    },
    userInfo :  state => state.user.userInfo
}