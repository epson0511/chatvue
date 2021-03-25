<template>
  <div class="outer-container p-grid">
    <div class="p-col-12 text-head"><h3>ChatRoomPage 線上人數{{ totalcount }}</h3></div>
    <div class="p-col-12">
      <div class="p-d-flex p-flex-column p-jc-end">
        <div class="text-body">
          <div class="p-col-12 dialog" v-for="item in messageSended" :key="item">
            <div v-if="item.greeting == null || item.greeting == false">{{ item.username }}：{{ item.msg }}</div>
            <div v-else>[{{ item.username }}]{{ item.msg }}</div>
          </div>
        </div>
      </div>
      <div v-if="rank !== 0" class="p-col-12 input-body">
        <InputText
          class="p-col-10 p-md-11 p-lg-11"
          type="text"
          ref="input"
          v-model.trim="message"
          placeholder="say someting..."
          @keyup.enter.exact="send"
        />
        <Button
          label="Warning"
          class="p-button-warning p-col-2 p-md-1 p-lg-1 btn-send"
          :disabled="isTexted"
          @click="send"
          >送出</Button
        >
      </div>
      <div v-else-if="rank === 0" class="p-col-12 input-body">
        <Button
          label="Info"
          class="p-button-info p-col-2 p-md-1 p-lg-1 btn-send"
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
          v-model.trim="username"
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
          class="p-button-primary p-col-2 p-md-1 p-lg-1 btn-send"
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
import { connectSocket, sendText } from "../utils/api";
import { uuid } from "../utils/tools.js";
import { useStore } from "vuex";

export default {
  name: "chat-room",
  data() {
    return {
      isdisable: true,
      userid: "anonymous",
      username: "",
      message: "",
      messageSend: [],
      greeting: false,
    };
  },
  watch:{
    rank: function (){
      console.log('rank changed')
    }
  },
  computed: {
    isTexted: function () {
      return this.message.length > 0 ? false : true;
    },
    isanonymous: function () {
      return this.userid === "xxx_typing_the_user_xxx" ? false : true;
    },
    rank () {
      return this.$store.state.ws.rank;
    },
    messageSended (){
      return this.$store.state.ws.messageCollection;
    },
    totalcount () {
      return this.$store.state.ws.totalcount;
    }
  },
  methods: {
    send: function () {
      if (this.message != "") {

        let params = {
          userKey: this.$store.state.ws.userKey,
          username: this.username,
          msg: this.message,
        };

        this.messageSend.push(params);
       sendText(JSON.stringify(params));
        console.log(this.$store.state.ws.messageCollection)
        // this.$store.commit("ws/setMessageCollection", params);
      }
      this.message = "";
      this.$nextTick(() => {
        const el = document.querySelector(".text-body");
        el.scrollTop = el.scrollHeight;
        this.realScrollHeight = el.scrollHeight;
        this.scrollHeight = el.scrollHeight;
      });
    },
    checkUser: function () {
      if (this.rank === 0) {
        console.log("anonymous_這邊是未登入的意思");
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
      //  const store = useStore();
      console.log(this.$store.state.ws.username);
      if (this.username !== "") {
        let params = {
          // userid: 0,
          username: this.username,
          avatar: "anonymous",
          greeting: true,
        };

        const createUuid = uuid();
        this.$store.commit("ws/setUserkey", createUuid);
        console.log(this.$store.state.ws.userid);
        this.$store.commit("ws/setUuidList", createUuid);

        console.log(this.$store.state.ws.uuidList);

        const userinfo = JSON.stringify(params);
        console.log(userinfo);
        connectSocket(userinfo);
      }
    },
    openModalLogin() {
      this.$store.commit("statecenter/setLogin", true);
    },
  },
  components: {
    InputText,
    Button,
  },
  setup() {
    const store = useStore();
    console.log(store.state.ws.userKey);
    console.log(store.state.ws.username);

    // connectSocket();
    // return {};
  },
  mounted() {
    this.checkUser();
  },
  updated() {
    this.focusInput();
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
.text-body {
  position: absolute;
  left: 0;
  /* height: 100%; */
  top: 120px;
  bottom: 76px;
  width: 100%;
  overflow-y: auto;
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
  left: 0;
  /* height: 100%; */
  top: 60px;
  padding: 0;
}
.dialog {
  border: 1px solid #73ad21;
  margin: 0;
  text-align: left;
}
.btn-send {
  justify-content: center;
  color: #ffffff !important;
  font-weight: bold !important;
}
</style>