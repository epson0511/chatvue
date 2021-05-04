import store from "../store";
import { wsendpoint } from "../utils/endpoint.js";

const wsUrl = wsendpoint + "chat/groupChat/10000/";

let socket = null;

export const connectSocket = (userinfo) => {
  //   console.log(store.state.ws.uuidList.lastIndexOf(store.state.ws.userid));
  // const useridbyindex = store.state.ws.uuidList.lastIndexOf(store.state.ws.userid);

  socket = new WebSocket(wsUrl + store.state.ws.userKey);

  socket.onopen = function() {
    socket.send(userinfo);
  };

  socket.onmessage = function(e) {
    let resData = JSON.parse(e.data);
    if (resData.rank && store.state.ws.userKey === resData.userId) {
      store.commit("ws/setRank", resData.rank);
    }
    if (resData.count) {
      store.commit("ws/setTotalCount", resData.count);
    }

    store.commit("ws/setMessageCollection", resData);
  };

  socket.onclose = function(e) {
    console.log("連線關閉: " + e);
  };

  socket.onerror = function(err) {
    console.log("error", err);
  };
};

export function sendText(msg) {
  //   console.log("api-sendText:" + msg);
  socket.send(msg);
}

export function forceColse() {
  if (socket != null) {
    socket.close();
  }
}

