import { createStore } from 'vuex'
import ws from "./ws";
import statecenter from "./statecenter";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: { 
    ws, statecenter
  }
})
