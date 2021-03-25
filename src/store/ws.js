export const state = {
    wsRes: {},
    userKey: '00000',
    username: '預設名稱',
    uuidList: [],
    rank: 0,
    totalcount: 0,
    messageCollection: [],
  };
  export const actions = {};
  
  export const mutations = {
    setWsRes(state, payload) {
      state.wsRes = payload;
    },
    setUsername(state, payload){
        state.username = payload;
    },
    setUserkey(state, payload){
        state.userKey = payload;
    },
    setUuidList(state, payload){
        state.uuidList.push((payload));
    },
    setRank(state, payload){
        state.rank = payload;
    },
    setMessageCollection(state, payload){
        state.messageCollection.push(payload);
    },
    setTotalCount(state, payload){
        state.totalcount = payload;
    }
  };
  export const getters = {};
  
  export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true,
  };