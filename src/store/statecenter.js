export const state = {
    loginbox: false,
    token: localStorage.getItem("token"),
    channelURL:localStorage.getItem("channel"),
    wsStatus:0,
  };
  export const actions = {};
  
  export const mutations = {
    setLoginBox(state, payload) {
      state.loginbox = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    },
    setChannelURL(state, payload) {
      state.channelURL = payload;
    },
    setWsStatus(state, payload) {
      state.wsStatus = payload;
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