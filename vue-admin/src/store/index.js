import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user"
import app from "./modules/app"
import {getters} from "./getters"

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules : {
    user,
    app
  }
});


































// import {login} from "../api/sys"
// import md5 from "md5"
// state: {
  //   token: ""
  // },
  // getters: {

  // },
  // mutations: {
  //   setToken(state, token) {
  //     state.token = token
  //   }
  // },
  // actions: {
  //   login({ commit }, userInfo) {
  //     let { username, password } = userInfo;
  //     return new Promise((resolve, reject) => {
  //       login({ username, password: md5(password) }).then(response => {
  //         console.log(response)
  //         commit("setToken", response.data.data.token)
  //         resolve()
  //       }).catch(error => {
  //         reject()
  //       })
  //     })
  //   }
  // }