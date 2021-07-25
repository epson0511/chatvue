<template>
  <div class="text-head">
    <Button
      label="聊天室"
      icon="pi pi-fw pi-th-large"
      class="p-button-text p-button-help"
      @click="backtochat"
    />
    <Button
      v-bind:label="onlineshow"
      icon="pi pi-fw pi-users"
      class="p-button-text p-button-help"
      @click="openuserlist"
    />
    <Button
      type="button"
      icon="pi pi-fw pi-caret-down"
      class="p-button-text p-button-warning chatroom-function"
      label="功能表"
      @click="toggle"
    />
    <Menu ref="menu" :model="items" :popup="true" appendTo="body" />
  </div>

  <div class="text-body">
    <div class="list-body" v-if="isuserlist">
      <div class="list-item" v-for="item in userlist" :key="item">
        <img
          v-if="item.userpic == null || item.userpic == ''"
          class="chatroom_userimg"
          v-bind:src="require(`@/static/image/${getDefaultImg(item.userKey)}`)"
          style="height: 15rem"
        />
        <img
          v-else
          class="chatroom_userimg"
          v-bind:src="'data:image/png;base64,' + item.userpic"
          style="height: 15rem"
        />
        <div class="namearea-group-list">
          <div v-bind:class="getIcon(item)"></div>
          <div
            v-bind:class="getNameStyle(item)"
            class="nameOnly"
            @click="to_userinfo(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="text-content" v-else>
      <template v-for="item in messageSended" :key="item">
        <div
          class="dialog"
          v-bind:class="setMod(rank)"
          v-if="item.msgShow !== 0"
        >
          <img
            v-if="item.userpic == null || item.userpic == ''"
            class="chatroom_userimg"
            v-bind:src="
              require(`@/static/image/${getDefaultImg(item.userKey)}`)
            "
            style="height: 15rem"
          />
          <img
            v-else
            class="chatroom_userimg"
            v-bind:src="'data:image/png;base64,' + item.userpic"
            style="height: 15rem"
          />
          <div
            class="text-group"
            :style="{ fontSize: fontSize + 'rem' }"
            v-if="item.greeting == null"
          >
            <div class="namearea-group">
              <div
                v-bind:class="getIcon(item)"
                :style="{ fontSize: fontSize + 'rem' }"
              ></div>
              <div
                v-bind:class="getNameStyle(item)"
                class="nameOnly"
                @click="to_userinfo(item)"
              >
                {{ item.username }}
              </div>
              <span class="namestyle">：</span>
            </div>
            <div
              class="chatroom_usermsg"
              v-linkified
              v-if="isSticker(item.msg)"
            >
              <img
                class="sticker-item-show"
                v-bind:src="
                  require(`@/static/sticker/${getStickerToShow(item.msg)}`)
                "
              />
            </div>
            <span
              class="chatroom_usermsg"
              v-linkified
              v-else-if="isFace(item.msg)"
            >
              <img
                class="face-item-show"
                v-bind:src="require(`@/static/face/${getFaceToShow(item.msg)}`)"
              />
            </span>
            <span class="chatroom_usermsg" v-linkified v-else>
              {{ item.msg }}
            </span>
          </div>
          <span class="msgTime">{{ item.msgTime }}</span>
          <div class="banBtn pi pi-times-circle" @click="banMsg(item)"></div>
        </div>
      </template>
    </div>
  </div>
  <div v-if="!isuserlist">
    <div v-if="rank !== 0" class="p-col-12 input-body">
      <OverlayPanel ref="stickerbody" :style="{ width: '22.5rem' }">
        <Card class="sticker-container">
          <template #header>
            <!-- <img alt="user header" src="demo/images/usercard.png" /> -->
            <div class="sticker-header">
              <div class="p-field-checkbox">
                <Checkbox
                  id="sticker-checker"
                  name="stikcer"
                  value="stikcer"
                  v-model="sticker.stickerType"
                />
                <label for="sticker-checker">貼圖</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox
                  id="face-checker"
                  name="stikcer"
                  value="face"
                  v-model="sticker.stickerType"
                />
                <label for="face-checker">表情</label>
              </div>
              <div class="p-field-checkbox">
                <Checkbox
                  id="facetext-checker"
                  name="stikcer"
                  value="facetext"
                  v-model="sticker.stickerType"
                />
                <label for="facetext-checker">文字</label>
              </div>
            </div>
          </template>
          <!-- <template #title>貼圖名</template> -->
          <template #content>
            <div
              class="sticker-area"
              v-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'conan'
              "
            >
              <img
                class="sticker-item"
                v-for="index in 62"
                :key="index"
                v-bind:src="require(`@/static/sticker/conan/${index}.png`)"
                @click="sticker_send('sticker', 'conan', 'png', `${index}`)"
              />
              <img
                class="sticker-item"
                src="@/static/sticker/conan/1.gif"
                @click="sticker_send('sticker', 'conan', 'gif', 1)"
              />
              <!-- <img class="sticker-item" src="@/static/image/blank.png" /> -->
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'hikari'
              "
            >
              <img
                class="sticker-item"
                v-for="index in 5"
                :key="index"
                v-bind:src="require(`@/static/sticker/hikari/${index}.png`)"
                @click="sticker_send('sticker', 'hikari', 'png', `${index}`)"
              />
              <img
                class="sticker-item"
                src="@/static/sticker/hikari/1.gif"
                @click="sticker_send('sticker', 'hikari', 'gif', 1)"
              />
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'chuka'
              "
            >
              <img
                class="sticker-item"
                v-for="index in 2"
                :key="index"
                v-bind:src="require(`@/static/sticker/chuka/${index}.png`)"
                @click="sticker_send('sticker', 'chuka', 'png', `${index}`)"
              />
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'hunter'
              "
            >
              <img
                class="sticker-item"
                v-for="index in 1"
                :key="index"
                v-bind:src="require(`@/static/sticker/hunter/${index}.png`)"
                @click="sticker_send('sticker', 'hunter', 'png', `${index}`)"
              />
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'other'
              "
            >
              <img
                class="sticker-item"
                v-for="index in 9"
                :key="index"
                v-bind:src="require(`@/static/sticker/other/${index}.png`)"
                @click="sticker_send('sticker', 'other', 'png', `${index}`)"
              />
              <!-- <img class="sticker-item" src="@/static/image/blank.png" /> -->
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'sticker' &&
                this.sticker.stickerData.key == 'recent'
              "
            >
              <img
                class="sticker-item"
                v-for="item in recentStickerReverse"
                :key="item"
                v-bind:src="require(`@/static/sticker/${item}`)"
                @click="sticker_recent_send('sticker', `${item}`)"
              />
              <!-- <img class="sticker-item" src="@/static/image/blank.png" /> -->
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'face' &&
                this.sticker.stickerData.key == 'other'
              "
            >
              <img
                class="face-item"
                v-for="index in 3"
                :key="index"
                v-bind:src="require(`@/static/face/other/${index}.png`)"
                @click="sticker_send('face', 'other', 'png', `${index}`)"
              />
              <!-- <img class="face-item" src="@/static/image/blank.png" /> -->
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'facetext' &&
                this.sticker.stickerData.key == 'one'
              "
            >
              <Button
                class="
                  p-button
                  p-component
                  p-button-raised
                  p-button-help
                  p-button-text
                  facetext-item
                "
                v-for="item in facetext.one"
                :key="item"
                v-bind:label="item"
                @click="facetext_append(item)"
              />
            </div>
            <div
              class="sticker-area"
              v-else-if="
                this.sticker.stickerData.group == 'facetext' &&
                this.sticker.stickerData.key == 'two'
              "
            >
              <Button
                class="
                  p-button
                  p-component
                  p-button-raised
                  p-button-help
                  p-button-text
                  facetext-item-long
                "
                v-for="item in facetext.two"
                :key="item"
                v-bind:label="item"
                @click="facetext_append(item)"
              />
            </div>
            <div class="sticker-area" v-else>
              <!-- <img class="sticker-item" src="@/static/image/blank.png" /> -->
              <!-- <img class="sticker-item" src="@/static/image/blank.png" /> -->
            </div>
          </template>
          <template #footer>
            <div class="sticker-switcher">
              <div
                class="pi pi-clock sticker-recent-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'recent',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                @click="sticker_selected('sticker', 'recent')"
                v-if="sticker.stickerType.includes('stikcer')"
              ></div>
              <img
                class="sticker-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'conan',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/sticker/conan/42.png"
                @click="sticker_selected('sticker', 'conan')"
                v-if="sticker.stickerType.includes('stikcer')"
              />
              <img
                class="sticker-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'hikari',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/sticker/hikari/1.png"
                @click="sticker_selected('sticker', 'hikari')"
                v-if="sticker.stickerType.includes('stikcer')"
              />
              <img
                class="sticker-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'chuka',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/sticker/chuka/2.png"
                @click="sticker_selected('sticker', 'chuka')"
                v-if="sticker.stickerType.includes('stikcer')"
              />
              <img
                class="sticker-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'hunter',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/sticker/hunter/1.png"
                @click="sticker_selected('sticker', 'hunter')"
                v-if="sticker.stickerType.includes('stikcer')"
              />
              <img
                class="sticker-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'sticker',
                    'other',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/sticker/other/5.png"
                @click="sticker_selected('sticker', 'other')"
                v-if="sticker.stickerType.includes('stikcer')"
              />
              <img
                class="face-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'face',
                    'other',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                src="@/static/face/other/1.png"
                @click="sticker_selected('face', 'other')"
                v-if="sticker.stickerType.includes('face')"
              />
              <div
                class="text-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'facetext',
                    'one',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                @click="sticker_selected('facetext', 'one')"
                v-if="sticker.stickerType.includes('facetext')"
              >
                (◔౪◔)
              </div>
              <div
                class="text-icon"
                v-bind:class="
                  ActiveStickerIcon(
                    'facetext',
                    'two',
                    sticker.stickerData.group,
                    sticker.stickerData.key
                  )
                "
                @click="sticker_selected('facetext', 'two')"
                v-if="sticker.stickerType.includes('facetext')"
              >
                (╯‵□′)╯︵┴─┴
              </div>
            </div>
          </template>
        </Card>
      </OverlayPanel>
      <div class="pi pi-microsoft btnSticker" @click="showsticker"></div>
      <InputText
        class=""
        type="text"
        ref="input"
        v-model.trim="message"
        placeholder="say someting..."
        @keyup.enter.exact="send"
      />
      <Button
        label="Warning"
        class="p-button-warning btn-send"
        :disabled="isTexted"
        @click="send"
        >送出</Button
      >
    </div>
    <div v-else-if="rank === 0" class="p-col-12 guest-body">
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
  <Toast
    class="toast_chatroom"
    position="top-center"
    group="chatroom_greeting"
  />
  <Toast class="toast_main" position="top-center" group="main_greeting" />
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Menu from "primevue/menu";
import Toast from "primevue/toast";
import OverlayPanel from "primevue/overlaypanel";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
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
      Size: 1.2,
      sticker: {
        stickerType: ["face", "stikcer", "facetext"],
        stickerData: {
          group: "",
          key: "",
          name: "",
          index: 0,
        },
        stickerRecent: [],
      },
      facetext: {
        one: [
          "(◔౪◔)",
          "눈_눈",
          "( ～'ω')～",
          "(((ﾟДﾟ;)))",
          "(･ω´･ )",
          "(っ・Д・)っ",
          "Σ(ﾟдﾟ)",
          "ヽ(`Д´)ノ",
          "_(:3 」∠ )_",
          "(`・ω・´)",
          "ಠ_ಠ",
          "థ౪థ",
          "( ﾟДﾟ)σ",
          "(☉д⊙)",
          "ლ(╹◡╹ლ)",
          "(・∀・)つ⑩",
          "( ^ω^)",
          "(´･ω･`)",
          "(*´･д･)?",
          "(ಠ益ಠ)",
          "ヽ(✿ﾟ▽ﾟ)ノ",
        ],
        two: [
          "（ﾟДﾟ）σ弌弌弌弌弌弌弌弌弌⊃",
          "(╯‵□′)╯︵┴─┴",
          "( ￣ 3￣)y▂ξ",
          "─=≡Σ((( つ•̀ω•́)つ",
          "ｷﾀ━━━━(ﾟ∀ﾟ)━━━━!!",
          "┬┴┬┴┤(・_├┬┴┬┴",
          "(╬▼дﾟ)▄︻┻┳═一",
          "（つ> _◕）つ︻╦̵̵͇̿╤───",
          "༼ つ/̵͇̿̿/’̿’̿   ◕ _◕ ༽つ/̵͇̿̿/’̿’̿ ",
          "◢▆▅▄▃崩╰(〒皿〒)╯潰▃▄▅▇◣",
        ],
      },
      items: [
        {
          label: "僅聊天室",
          icon: "pi pi-comments",
          to: "/Chatroom",
        },
        {
          label: "直播間",
          icon: "pi pi-video",
          to: "/main",
        },
        {
          label: "字體放大",
          icon: "pi pi-search-plus",

          command: () => {
            this.fontPlus();
            this.toggle(e);
          },
        },
        {
          label: "字體縮小",
          icon: "pi pi-search-minus",
          command: () => {
            this.fontMinus();
            this.toggle(e);
          },
        },
      ],
    };
  },
  watch: {
    rank: function () {
      // console.log("rank changed");
      if (this.rank > 1) {
        this.openWsByToken();
      } else {
        this.$store.commit("ws/resetMessageCollection");
      }
    },
    messageSize: function () {
      this.$nextTick(() => {
        const el = document.querySelector(".text-content");
        el.scrollTop = el.scrollHeight;
      });
    },
    // stickerTypeGroup: function () {
    // },
    loginSize: function () {
      let data = this.$store.state.ws.loginCollection;
      let username = data.slice(-1)[0].username;
      let current_reute = this.$route.name;

      if ("Chatroom" === current_reute) {
        this.$toast.add({
          severity: "warn",
          // summary: "登入",
          detail: username + " 進入聊天室！",
          closable: false,
          group: "chatroom_greeting",
          life: 4000,
        });
      } else {
        this.$toast.add({
          severity: "warn",
          // summary: "登入",
          detail: username + " 進入聊天室！",
          closable: false,
          group: "main_greeting",
          life: 4000,
        });
      }
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
    loginSize() {
      return this.$store.state.ws.loginCollection.length;
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
    onlineshow() {
      return "線上列表 (" + this.totalcount + ")";
    },
    fontSize() {
      return this.Size;
    },
    stickerTypeGroup() {
      return this.sticker.stickerType.length;
    },
    recentStickerReverse() {
      return this.sticker.stickerRecent.reverse();
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
          userpic: this.$store.state.ws.userpic,
          msg: this.maxTextLength(this.message),
          msgShow: 1,
        };
        this.isuserlist = false;
        this.messageSend.push(params);
        sendText(JSON.stringify(params));
      }
      this.message = "";
      this.focusInput();
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
        this.focusInput();
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
      this.$nextTick(() => {
        const el = document.querySelector(".text-content");
        el.scrollTop = el.scrollHeight;
        // this.focusInput();
      });
    },
    popchatroom() {
      this.$router.push({ path: "/chatroom" });
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
        modstyle: false,
        masterstyle: false,
        memstyle0: false,
        memstyle1: false,
        memstyle2: false,
        memstyle3: false,
        memstyle4: false,
        memstyle5: false,
        memstyle6: false,
        memstyle7: false,
        memstyle8: false,
        memstyle9: false,
        memstyle10: false,
        memstyle11: false,
        memstyle12: false,
        memstyle13: false,
        memstyle14: false,
        memstyle15: false,
        memstyle16: false,
        memstyle17: false,
      };

      if (item.userLevel === 8 || item.level === 8) {
        style.modstyle = true;
      } else if (item.userLevel === 9 || item.level === 9) {
        style.masterstyle = true;
      } else {
        // let indexKey = parseInt(item.userKey);
        // let indexId = parseInt(item.id);

        if (item.level != 1 && item.userKey === parseInt(item.userKey, 10)) {
          let mem = this.idColorSelecter(parseInt(item.userKey));
          style[mem] = true;
        } else if (item.level != 1 && item.id === parseInt(item.id, 10)) {
          let mem = this.idColorSelecter(parseInt(item.id));
          style[mem] = true;
        }
      }
      return style;
    },
    getIcon(item) {
      let style = {
        namestyle: true,
        pi: false,
        ["pi-shield"]: false,
        ["pi-print"]: false,
        modstyle: false,
        masterstyle: false,
      };

      if (item.userLevel === 8 || item.level === 8) {
        style.modstyle = true;
        style.pi = true;
        style["pi-shield"] = true;
      } else if (item.userLevel === 9 || item.level === 9) {
        style.masterstyle = true;
        style.pi = true;
        style["pi-print"] = true;
      }
      return style;
    },
    idColorSelecter(userKey) {
      let index = userKey % 18;
      return "memstyle" + index;
    },
    setMod(rank) {
      let style = {
        ["dialog-mod"]: false,
      };
      if (rank === 8 || rank === 9) {
        style["dialog-mod"] = true;
      }
      return style;
    },
    compare(a, b) {
      if (a.level > b.level) {
        return -1;
      }
      if (a.level < b.level) {
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
        // console.log("msgban:" + JSON.stringify(item));
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
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    getDefaultImg(e) {
      let url = "epson_87.jpg";
      let index = e % 6;
      if (index == 0) {
        url = "black0.png";
      }
      if (index == 1) {
        url = "black1.png";
      }
      if (index == 2) {
        url = "black2.png";
      }
      if (index == 3) {
        url = "black3.png";
      }
      if (index == 4) {
        url = "black4.png";
      }
      if (index == 5) {
        url = "black5.png";
      }

      return url;
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
    fontPlus() {
      if (this.Size < 2) {
        this.Size += 0.1;
      }
    },
    fontMinus() {
      if (this.Size > 0.5) {
        this.Size -= 0.1;
      }
    },
    to_userinfo(item) {
      if (item.userLevel >= 2) {
        this.$router.push({
          path: "/user/" + item.userKey,
        });
      }
      if (item.level >= 2) {
        this.$router.push({
          path: "/user/" + item.id,
        });
      }
    },
    showsticker(event) {
      this.$refs.stickerbody.toggle(event);
    },
    sticker_selected(group, name) {
      this.sticker.stickerData.group = group;
      this.sticker.stickerData.key = name;
    },
    sticker_send(group, name, type, index) {
      let params = {
        msgHash: uuid(),
        userKey: this.$store.state.ws.userKey,
        userLevel: this.$store.state.ws.rank,
        username: this.username,
        userpic: this.$store.state.ws.userpic,
        msg: "[" + group + "]" + name + "/" + index + "." + type,
        msgShow: 1,
      };
      this.isuserlist = false;
      this.messageSend.push(params);

      this.sticker.stickerData.name = name;
      let pushRecent = name + "/" + index + "." + type;

      if (
        group == "sticker" &&
        !this.sticker.stickerRecent.includes(pushRecent)
      ) {
        this.sticker.stickerRecent.push(pushRecent);
      }
      if (this.sticker.stickerRecent.length > 30) {
        this.sticker.stickerRecent.splice(0, 1);
      }
      localStorage.setItem("stickerRecent", this.sticker.stickerRecent);
      sendText(JSON.stringify(params));
      this.$refs.stickerbody.toggle();
    },
    sticker_recent_send(group, item) {
      const name = item.split("/")[0];
      const index = item.split("/")[1].split(".")[0];
      const type = item.split(".")[1];

      this.sticker_send(group, name, type, index);
    },
    isSticker(msg) {
      if (msg.startsWith("[sticker]")) {
        return true;
      } else {
        return false;
      }
    },
    isFace(msg) {
      if (msg.startsWith("[face]")) {
        return true;
      } else {
        return false;
      }
    },
    getStickerToShow(msg) {
      let url = msg.replace("[sticker]", "");
      return url;
    },
    getFaceToShow(msg) {
      let url = msg.replace("[face]", "");
      return url;
    },
    ActiveStickerIcon(group, name, groupKey, nameKey) {
      if (group == groupKey && name == nameKey) {
        return "sticker-icon-active";
      } else {
        return null;
      }
    },
    facetext_append(item) {
      this.message += item;
      this.$refs.stickerbody.toggle();
    },
    getStickerImg(e) {
      let url = "epson_87.jpg";
      let index = e % 6;
      if (index == 0) {
        url = "black0.png";
      }
      if (index == 1) {
        url = "black1.png";
      }
      if (index == 2) {
        url = "black2.png";
      }
      if (index == 3) {
        url = "black3.png";
      }
      if (index == 4) {
        url = "black4.png";
      }
      if (index == 5) {
        url = "black5.png";
      }

      return url;
    },
    iamAlive(id) {
        if (id.toString().length == 6) {
        let params = {
          userid: id,
          serverjob: 'count_point',
          msgShow: 0,
        };
        sendText(JSON.stringify(params));
      }
    },
  },
  components: {
    InputText,
    Button,
    Menu,
    Toast,
    OverlayPanel,
    Card,
    Checkbox,
  },
  setup() {},
  beforeMount() {
    if (this.$store.state.ws.messageCollection.length === 0) {
      this.initMsgHistory();
    }
    if (
      this.$store.state.ws.rank > 1 &&
      this.$store.state.statecenter.wsStatus != 1
    ) {
      this.openWsByToken();
    }
    if (localStorage.getItem("stickerRecent") != null) {
      this.sticker.stickerRecent = localStorage
        .getItem("stickerRecent")
        .split(",");
    }
    // 初始化貼圖選單
    this.sticker_selected("sticker", "recent");
  },
  mounted() {
    // console.log(this.$store.state.ws.userpic);
    this.getuserlist();
    this.$nextTick(() => {
      const el = document.querySelector(".text-content");
      el.scrollTop = el.scrollHeight;
    });
    setInterval(() => {
      if (
        this.$store.state.ws.rank > 1 &&
        this.$store.state.statecenter.wsStatus != 0
      ) {
        this.iamAlive(this.$store.state.ws.userKey);
      }
    }, 60000);
  },
  updated() {
    // this.focusInput();
    this.banMsg();
    this.$nextTick(() => {
      const el = document.querySelector(".text-content");
      if (el != null) {
        el.scrollTop = el.scrollHeight;
      }
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap");

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
.text-content,
.list-body {
  /* position: absolute; */
  left: 0;
  /* height: 100%; */
  top: 120px;
  bottom: 76px;
  width: 100%;
  overflow-y: scroll;
  background-color: rgb(253, 253, 253);
  max-height: calc(100vh - 195px);
  -webkit-overflow-scrolling: touch;
}
.text-body {
  /* z-index: 1; */
  max-height: calc(100vh - 195px);
}
.guest-body {
  /* position: absolute; */
  left: 0;
  bottom: 20px;
  width: 100%;
  overflow: hidden;
  background-color: rgb(100, 100, 100);
}
.input-body {
  display: grid;
  grid-template-columns: 2.2rem 1fr 4.2rem;
  /* left: 0;
  bottom: 20px;
  width: 100%; */
  overflow: hidden;
  background-color: rgb(100, 100, 100);
}
.btnSticker {
  font-size: 1.7rem !important;
  align-self: center;
  padding-right: 0.4rem;
  color: bisque;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
}
.btnSticker:hover {
  color: orange;
}

.text-head {
  /* position: absolute; */
  /* height: 100%; */
  /* top: 60px;
  padding-left: 0 !important; */
  display: grid;
  grid-template-columns: 6rem 8.5rem 1fr;
}

.text-head .p-button-text {
  padding: 0rem 0.3rem;
  background-color: whitesmoke !important;
  border-radius: 0px !important;
}
.text-head .p-button-text .p-button-label {
  flex: 0 0 auto;
}

.chatroom-function {
  justify-self: right;
  padding-right: 1rem !important;
}
.dialog {
  margin: 0;
  padding: 0.2rem;
  text-align: left;
  display: grid;
  grid-template-columns: 1.8rem 1fr 3rem;
}
.list-item {
  margin: 0;
  padding: 0.2rem;
  text-align: left;
  display: grid;
  grid-template-columns: 1.8rem 1fr;
}
.banBtn {
  text-align-last: right;
  font-size: 1.3rem !important;
  display: none !important;
}
.dialog-mod:hover .banBtn {
  display: block !important;
  align-self: center;
}
.dialog-mod:hover .msgTime {
  display: none;
}

.dialog-mod:hover {
  background-color: peachpuff;
  grid-template-columns: 1.8rem 1fr 3rem;
}
.btn-send {
  justify-content: center;
  color: #ffffff !important;
  font-weight: bold !important;
}
.popoutchat {
  background-color: cornsilk;

  display: inline-flex !important;

  align-items: center;
  vertical-align: bottom;
  text-align: center;
  overflow: hidden;
  justify-content: center;
}
.namestyle {
  font-weight: bolder !important;
  align-self: center;
  display: inline-flex;
}
.nameOnly {
  cursor: pointer;
}
.modstyle {
  color: purple !important;
}
.masterstyle {
  color: orange !important;
}
.memstyle0 {
  color: deeppink;
}
.memstyle1 {
  color: brown;
}
.memstyle2 {
  color: lime;
}
.memstyle3 {
  color: blue;
}
.memstyle4 {
  color: lightseagreen;
}
.memstyle5 {
  color: hotpink;
}
.memstyle6 {
  color: skyblue;
}
.memstyle7 {
  color: yellowgreen;
}
.memstyle8 {
  color: gold;
}
.memstyle9 {
  color: royalblue;
}
.memstyle10 {
  color: chocolate;
}
.memstyle11 {
  color: crimson;
}
.memstyle12 {
  color: orangered;
}
.memstyle13 {
  color: midnightblue;
}
.memstyle14 {
  color: dimgray;
}
.memstyle15 {
  color: forestgreen;
}
.memstyle16 {
  color: mediumblue;
}
.memstyle17 {
  color: orchid;
}
.memstyleSP {
  background-image: linear-gradient(
    to left,
    violet,
    indigo,
    blue,
    green,
    yellow,
    orange,
    red
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.iconImg {
  /* position: absolute; */
  margin-top: -0.3rem;
  margin-left: -0.3rem;
  /* text-align-last: right; */
  font-size: 1.5rem !important;
  /* display: none !important; */
}
.msgTime {
  align-content: flex-end;
  font-size: 0.1rem;
  text-align: end;
  color: darkgray;
  align-self: center;
}
.text-group {
  /* margin-left: 1.7rem; */
  display: flex;
  word-break: break-word;
}
.zoomsize-group {
  display: grid;
  color: gray;
  background-color: cornsilk;
}
.namearea-group {
  /* display: initial; */
  /* vertical-align: text-top; */
  white-space: nowrap;
}
.namearea-group-list {
  display: initial;
  font-size: 1.2rem;
  align-self: center;
}
.namearea-group-list .pi {
  font-size: 1.2rem !important;
}
.chatroom_userimg {
  width: 1.8rem !important;
  height: 1.8rem !important;
  object-fit: cover;
}
.chatroom_usermsg {
  /* display: inline-flex; */
  /* font-weight: bold; */
  font-family: "Noto Sans TC", sans-serif;
}
.p-toast .p-toast-message .p-toast-message-content .p-toast-message-icon {
  display: none;
}
.toast_chatroom {
  top: 118px !important;
  width: 100% !important;
  left: 0% !important;
  margin-left: 0rem !important;
}
.toast_main {
  top: 118px !important;
  width: 35% !important;
  left: 65% !important;
  margin-left: 0rem !important;
}
.p-overlaypanel .p-overlaypanel-content {
  padding: 0rem !important;
}
.sticker-container {
  width: 22.5rem;
}
.sticker-container > .p-card-body {
  padding: 0rem !important;
}
.sticker-container > .p-card-body .p-card-content {
  padding: 0rem !important;
}
.sticker-container .p-card-footer {
  padding-top: 0rem !important;
}

.sticker-container .p-checkbox .p-checkbox-box.p-highlight {
  border-color: navy;
  background: navy;
}
.sticker-container
  .p-checkbox:not(.p-checkbox-disabled)
  .p-checkbox-box.p-highlight:hover {
  border-color: navy;
  background: navy;
}

.sticker-container .p-checkbox:not(.p-checkbox-disabled) .p-checkbox-box:hover {
  border-color: navy;
  /* background:aquamarine; */
}

.sticker-switcher {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0.5rem;
  height: 51px;
}
.sticker-header {
  display: flex;
  margin: 0.5rem;
}
.sticker-header .p-field-checkbox {
  color: mediumblue;
  /* margin-bottom: 0 !important; */
  margin-right: 0.8rem;
  font-weight: bold;
}
.sticker-area {
  height: 240px;
  display: flex;
  flex-flow: wrap;
  /* justify-content: space-around; */
  justify-content: start;
  align-content: flex-start;
  padding-left: 3px;
  overflow-y: auto;
}
.sticker-item {
  height: 68px;
  width: 68px;
  object-fit: cover;
}
.sticker-item-show {
  max-height: 100px;
  max-width: 200px;
  object-fit: cover;
}
.face-item {
  max-height: 40px;
  max-width: 40px;
  object-fit: contain;
}
.face-item-show {
  max-height: 1.5rem;
  /* max-width: 40px; */
  object-fit: contain;
}
.sticker-icon {
  height: 35px;
  width: 35px;
  object-fit: cover;
  border-radius: 5px;
  opacity: 0.6;
}
.facetext-item {
  width: 113px;
  /* object-fit: cover ; */
  /* overflow: hidden ; */
  white-space: nowrap;
  /* padding: 0  !important;
  padding-top: 5px !important;
  padding-bottom: 5px !important; */
}
.facetext-item-long {
  width: 340px;
  white-space: nowrap;
}
.facetext-item .p-button-label,
.facetext-item-long .p-button-label {
  font-family: "Noto Sans TC", sans-serif;
  color: indigo;
}
.text-icon {
  align-self: center;
  width: 35px;
  overflow: hidden;
  font-size: 0.8rem;
  opacity: 0.4;
}
.face-icon {
  height: 35px;
  width: 35px;
  object-fit: cover;
  border-radius: 25px;
  background-color: black;
  opacity: 0.6;
}
.sticker-recent-icon {
  width: 35px !important;
  font-size: 1.8rem !important;
  align-self: center;
  opacity: 0.4;
}
.sticker-recent-icon:hover,
.face-icon:hover,
.text-icon:hover,
.sticker-icon:hover {
  opacity: 1;
  cursor: pointer;
}
.sticker-recent-icon-active,
.face-icon-active,
.text-icon-active,
.sticker-icon-active {
  opacity: 1;
}
@media (max-aspect-ratio: 3/2) and (max-height: 930px) {
  .toast_main {
    width: 30% !important;
    left: 70% !important;
  }
  .toast_chatroom {
    top: 118px !important;
    width: 100% !important;
    left: 0% !important;
    margin-left: 0rem !important;
  }
}
@media screen and (min-width: 1600px) {
  .toast_main {
    top: 118px !important;
    width: 20% !important;
    left: 80% !important;
  }
  .toast_chatroom {
    top: 118px !important;
    width: 100% !important;
    left: 0% !important;
    margin-left: 0rem !important;
  }
}
@media screen and (max-width: 1000px) {
  .toast_main {
    top: 320px !important;
    width: 100% !important;
    left: 0% !important;
  }
  .toast_chatroom {
    top: 118px !important;
    width: 100% !important;
    left: 0% !important;
    margin-left: 0rem !important;
  }
}
</style>