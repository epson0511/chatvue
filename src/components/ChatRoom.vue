<template>
  <div class="outer-container p-grid">
    <div class="p-col-12 text-head">
      <div class="p-col-11 p-grid p-jc-end onlinecount">
        線上人數：{{ totalcount }}
      </div>
      <TabMenu class="p-col-12 roommenutab" :model="items"></TabMenu>
      <!-- <router-view /> -->
    </div>
    <div class="p-col-12">
      <div class="p-d-flex p-flex-column p-jc-end">
        <div class="list-body" v-if="isuserlist">
          <div class="p-col-12 dialog" v-for="item in userlist" :key="item">
            <div>{{ item.name }}</div>
          </div>
        </div>
        <div class="text-body" v-else>
          <template v-for="item in messageSended" :key="item">
            <div
              class="p-col-12 dialog"
              v-bind:class="setMod(rank)"
              v-if="item.msgShow !== 0"
            >
              <img
                class="iconImg"
                v-bind:src="`data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAKUlEQVR42u3NQQEAAAQEsJNcdGLw2AqsJukcKLFYLBaLxWKxWCwW/40XmbMs43NUtPcAAAAASUVORK5CYII=
`"
              />
              <div
                class="text-group"
                v-if="item.greeting == null || item.greeting == false"
              >
                <span v-bind:class="getNameStyle(item)">{{
                  item.username
                }}</span
                >：{{ item.msg }}
              </div>
              <div class="text-group" v-else>
                [{{ item.username }}]{{ item.msg }}
              </div>
              <div
                class="banBtn p-col-12 pi pi-times-circle"
                @click="banMsg(item)"
              ></div>
            </div>
          </template>
        </div>
      </div>
      <div v-if="rank !== 0" class="p-col-12 input-body">
        <InputText
          class="p-col-10 p-md-10 p-lg-10"
          type="text"
          ref="input"
          v-model.trim="message"
          placeholder="say someting..."
          @keyup.enter.exact="send"
        />
        <Button
          label="Warning"
          class="p-button-warning p-lg-2 btn-send"
          :disabled="isTexted"
          @click="send"
          >送出</Button
        >
      </div>
      <div v-else-if="rank === 0" class="p-col-12 input-body">
        <Button
          label="Info"
          class="p-button-info btn-send"
          v-show="isanonymous"
          @click="anonymous_set_name_typing"
          >訪客</Button
        >
        <Button
          class="p-button-danger"
          label=""
          icon="pi pi-times"
          iconPos="right"
          v-show="!isanonymous"
          @click="anonymous_back"
        />
        <InputText
          class="p-col-5 p-md-5 p-lg-5"
          ref="input"
          type="text"
          v-show="!isanonymous"
          v-model.trim="usernameSet"
          placeholder="set your name..."
          @keyup.enter="anonymous_set_name"
        />
        <Button
          label=""
          icon="pi pi-check"
          iconPos="right"
          @click="anonymous_set_name"
          v-show="!isanonymous"
        />

        <Button
          label="Primary"
          v-show="isanonymous"
          class="p-button-primary btn-send"
          @click="openModalLogin"
          >登入</Button
        >
      </div>
    </div>
  </div>
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import TabMenu from "primevue/tabmenu";
import { connectSocket, sendText } from "../utils/api";
import { uuid } from "../utils/tools.js";
import axios from "axios";
import { endpoint } from "../utils/endpoint.js";

// import { endpoint } from "../utils/endpoint.js";
// import axios from "axios";

export default {
  name: "chat-room",
  data() {
    return {
      isuserlist: false,
      userid: "anonymous",
      usernameSet: "",
      message: "",
      messageSend: [],
      greeting: false,
      namestyle: "namestyle",
      items: [
        {
          label: "聊天室",
          icon: "pi pi-fw pi-th-large",
          command: () => {
            this.backtochat();
          },
        },
        {
          label: "線上列表",
          icon: "pi pi-fw pi-users",
          command: () => {
            this.openuserlist();
          },
        },
      ],
      namestyle2: {
        pi: true,
        "pi-shield": true,
      },
    };
  },
  watch: {
    rank: function () {
      console.log("rank changed");
      if (this.rank > 1) {
        this.openWsByToken();
      }
    },
    messageSize: function () {
      this.$nextTick(() => {
        const el = document.querySelector(".text-body");
        el.scrollTop = el.scrollHeight;
      });
    },
  },
  computed: {
    isTexted: function () {
      return this.message.length > 0 ? false : true;
    },
    isanonymous: function () {
      return this.userid === "xxx_typing_the_user_xxx" ? false : true;
    },
    rank() {
      return this.$store.state.ws.rank;
    },
    messageSended() {
      return this.$store.state.ws.messageCollection;
    },
    messageSize() {
      return this.$store.state.ws.messageCollection.length;
    },
    totalcount() {
      return this.$store.state.ws.totalcount;
    },
    username() {
      return this.$store.state.ws.username;
    },
    userlist() {
      let obj = this.$store.state.ws.userlist;
      obj.sort(this.compare);
      return obj;
    },
  },
  methods: {
    send: function () {
      if (this.message != "") {
        let params = {
          msgHash: uuid(),
          userKey: this.$store.state.ws.userKey,
          userLevel: this.$store.state.ws.rank,
          username: this.username,
          msg: this.maxTextLength(this.message),
          msgShow: 1,
        };

        this.messageSend.push(params);
        sendText(JSON.stringify(params));
      }
      this.message = "";
    },
    checkUser: function () {
      if (this.$store.state.statecenter.token === null) {
        console.log("token not exist");
      } else {
        console.log("token exist, verifying...");

        // token驗證成功時設定使用者 失敗時刪除token
        this.openWsByToken();
      }
    },
    anonymous_set_name_typing: function () {
      this.userid = "xxx_typing_the_user_xxx";
    },
    focusInput() {
      this.$refs.input.$el.focus();
    },
    anonymous_back: function () {
      this.userid = "anonymous";
    },
    anonymous_set_name: function () {
      if (this.usernameSet !== "") {
        this.$store.commit("ws/setUsername", "(訪客)" + this.usernameSet);
        let params = {
          username: "(訪客)" + this.usernameSet,
          avatar: "anonymous",
          greeting: true,
        };
        const createUuid = uuid();
        this.$store.commit("ws/setUserkey", createUuid);
        this.$store.commit("ws/setUuidList", createUuid);
        const userinfo = JSON.stringify(params);
        connectSocket(userinfo);
      }
    },
    openModalLogin() {
      this.$store.commit("statecenter/setLoginBox", true);
    },
    openWsByToken() {
      try {
        let params = {
          username: this.$store.state.ws.username,
          userid: this.$store.state.ws.userKey,
          greeting: true,
          token: true,
        };
        connectSocket(JSON.stringify(params));
      } catch (error) {
        this.$store.commit("statecenter/setToken", null);
        localStorage.removeItem("token");
      }
    },
    openuserlist() {
      this.getuserlist();
      this.isuserlist = true;
    },
    backtochat() {
      this.isuserlist = false;
    },
    async getuserlist() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      const { data } = await axios.get(
        endpoint + "chat/rest/v1/userAPI/onlineUserList",
        {
          headers: headers,
        }
      );
      // console.log(Object.keys(data));
      this.$store.commit("ws/setTotalCount", Object.keys(data).length);
      this.$store.commit("ws/resetUserList");
      Object.values(data).forEach((item) =>
        this.$store.commit("ws/setUserList", item)
      );
    },
    getNameStyle(item) {
      let style = {
        namestyle: true,
        pi: false,
        ["pi-shield"]: false,
        ["pi-sun"]: false,
        modstyle: false,
        masterstyle: false,
      };

      if (item.userLevel === 3) {
        style.modstyle = true;
        style.pi = true;
        style["pi-shield"] = true;
      }

      if (item.userLevel === 9) {
        style.masterstyle = true;
        style.pi = true;
        style["pi-sun"] = true;
      }
      return style;
    },
    setMod(rank) {
      console.log("style!!:" + rank);
      let style = {
        ["dialog-mod"]: false,
      };
      if (rank === 3 || rank === 9) {
        style["dialog-mod"] = true;
      }
      return style;
    },
    compare(a, b) {
      if (a.userLevel < b.userLevel) {
        return -1;
      }
      if (a.userLevel > b.userLevel) {
        return 1;
      }
      return 0;
    },
    maxTextLength(str) {
      if (!str) return "";
      if (str.length > 100) {
        return str.slice(0, 100) + "...";
      }
      return str;
    },
    banMsg(item) {
      if (item != null) {
        console.log("msgban:" + JSON.stringify(item));
        let params = {
          msgHash: item.msgHash,
          userKey: item.userKey,
          userLevel: item.userLevel,
          username: item.username,
          msg: item.msg,
          msgShow: 0,
        };
        this.messageSend.push(params);
        sendText(JSON.stringify(params));
      }
    },
    async initMsgHistory() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      const { data } = await axios.get(
        endpoint + "chat/rest/v1/userAPI/msgHistory",
        {
          headers: headers,
        }
      );
      Object.values(data).forEach((item) =>
        this.$store.commit("ws/setMessageCollection", item)
      );
    },
  },
  components: {
    InputText,
    Button,
    TabMenu,
  },
  setup() {},
  mounted() {
    this.initMsgHistory();
    this.getuserlist();
  },
  updated() {
    this.focusInput();
    this.banMsg();
  },
};
</script>

<style>
.box {
  background-color: var(--surface-e);
  text-align: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
}
.vertical-container {
  margin: 0;
  height: 200px;
  background: var(--surface-d);
  border-radius: 4px;
}
.text-body,
.list-body {
  position: absolute;
  left: 0;
  /* height: 100%; */
  top: 120px;
  bottom: 76px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: rgb(241, 250, 226);
}
.input-body {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  overflow: hidden;
  background-color: rgb(129, 136, 238);
}
.outer-container {
  left: 0;
  overflow: hidden;
}
.text-head {
  position: absolute;
  /* height: 100%; */
  top: 60px;
  padding-left: 0 !important;
}
.dialog {
  border: 1px solid #73ad21;
  margin: 0;
  text-align: left;
  position: relative;
}
.banBtn {
  position: absolute;
  margin-top: -1.9rem;
  margin-left: -1rem;
  text-align-last: right;
  font-size: 1.5rem !important;
  display: none !important;
}
.dialog-mod:hover .banBtn {
  display: block !important;
}
.btn-send {
  justify-content: center;
  color: #ffffff !important;
  font-weight: bold !important;
}
.onlinecount {
  margin-top: 0.9rem !important;
  position: absolute;
  margin-left: 3% !important;
}
.roommenutab {
  display: flex;
}
.namestyle {
  font-weight: bolder !important;
}
.modstyle {
  color: purple !important;
}
.masterstyle {
  color: orange !important;
}
.iconImg {
  position: absolute;
  margin-top: -0.3rem;
  margin-left: -0.3rem;
  /* text-align-last: right; */
  font-size: 1.5rem !important;
  /* display: none !important; */
}
.text-group {
  margin-left: 1.7rem;
  word-break: break-all;
}
</style>