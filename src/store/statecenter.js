export const state = {
    login: false,
  };
  export const actions = {};
  
  export const mutations = {
    setLogin(state, payload) {
      state.login = payload;
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