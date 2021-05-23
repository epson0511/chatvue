export const state = {
  wsRes: {},
  userKey: "00000",
  username: "",
  uuidList: [],
  rank: 0,
  totalcount: 0,
  messageCollection: [],
  userlist: [],
  userpic: "",
};
export const actions = {};

export const mutations = {
  setWsRes(state, payload) {
    state.wsRes = payload;
  },
  setUsername(state, payload) {
    state.username = payload;
  },
  setUserkey(state, payload) {
    state.userKey = payload;
  },
  setUuidList(state, payload) {
    state.uuidList.push(payload);
  },
  setRank(state, payload) {
    state.rank = payload;
  },
  setMessageCollection(state, payload) {
    // console.table(state.messageCollection);
    // console.log("ws-payload:" + JSON.stringify(payload));
    if (payload.msgShow != 1) {
      // state.messageCollection=state.messageCollection.filter(m => m.msgHash !== payload.msgHash);
      state.messageCollection.forEach((item) => {
        if (item.msgHash === payload.msgHash) {
          item.msgShow = 0;
        }
      });
    } else {
      state.messageCollection.push(payload);
    }
  },
  setTotalCount(state, payload) {
    state.totalcount = payload;
  },
  setUserPic(state, payload) {
    state.userpic = payload;
  },
  setUserList(state, payload) {
    state.userlist.push(payload);
  },
  resetUserList(state) {
    state.userlist = [];
  },
  resetMessageCollection(state) {
    state.messageCollection = [];
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
