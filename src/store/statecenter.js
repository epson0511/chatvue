export const state = {
    loginbox: false,
    token: localStorage.getItem("token"),
  };
  export const actions = {};
  
  export const mutations = {
    setLoginBox(state, payload) {
      state.loginbox = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
  };
  export const getters = {};
  
  export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
  };