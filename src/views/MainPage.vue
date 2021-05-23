<template>
  <div class="main">
    <div class="media-body">
      <div class="channel-switcher">
        <Button
          v-bind:class="museActive ? out_active : out_notactive"
          @click="to_musetw"
          >木棉花
        </Button>
        <Button
          v-bind:class="huya_chunhua_Active ? out_active : out_notactive"
          @click="huya_chunhua"
        >
          小當家
        </Button>
        <Button
          v-bind:class="huya_tennis_Active ? out_active : out_notactive"
          @click="huya_tennis"
          style="font-size: 1rem; padding: 0rem 0.5rem"
        >
          網球王子
        </Button>
        <Button
          v-bind:class="huya_labi_Active ? out_active : out_notactive"
          @click="huya_labi"
          style="font-size: 1rem; padding: 0rem 0.5rem"
        >
          蠟筆小新
        </Button>
        <Button
          id="btnMin"
          v-bind:class="okActive ? active : notactive"
          @click="to_ok"
        >
          主頻道
        </Button>
        <Button
          id="btnSub"
          v-bind:class="fc2Active ? active : notactive"
          @click="to_fc2"
        >
          副頻道
        </Button>
        <Button
          v-bind:class="musicActive ? active_danger : notactive_danger"
          @click="to_music"
        >
          音樂台
        </Button>
      </div>
      <MediaRoom :key="componentKey"></MediaRoom>
    </div>
    <div class="chat-body">
      <ChatRoom :key="componentKey"></ChatRoom>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from "@/components/ChatRoom.vue";
import MediaRoom from "@/components/MediaRoom.vue";
import Button from "primevue/button";

export default {
  name: "mainpage",
  data() {
    return {
      componentKey: 0,
      museActive: false,
      huya_chunhua_Active: false,
      huya_tennis_Active: false,
      huya_labi_Active: false,
      okActive: false,
      fc2Active: false,
      musicActive: false,

      active: {
        ["p-button-outlined"]: false,
        ["p-button-help"]: true,
      },
      notactive: {
        ["p-button-outlined"]: true,
        ["p-button-help"]: true,
      },
      out_active: {
        ["p-button-outlined"]: false,
        ["p-button-secondary"]: true,
      },
      out_notactive: {
        ["p-button-outlined"]: true,
        ["p-button-secondary"]: true,
      },
      active_danger: {
        ["p-button-outlined"]: false,
        ["p-button-danger"]: true,
      },
      notactive_danger: {
        ["p-button-outlined"]: true,
        ["p-button-danger"]: true,
      },
    };
  },
  watch: {
    token: function () {
      console.log("token now is" + this.token);
      this.forceRerender();
    },
    "$store.state.ws.rank": function () {
      if (this.rank == 1) {
        this.forceRerender();
      }
    },
  },
  computed: {
    token() {
      return this.$store.state.statecenter.token;
    },
    rank() {
      return this.$store.state.ws.rank;
    },
  },
  components: {
    ChatRoom,
    MediaRoom,
    Button,
  },
  mounted() {},
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    to_musetw: function () {
      this.museActive = true;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = false;
      this.okActive = false;
      this.fc2Active = false;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_MUSETW +
          "&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
      localStorage.setItem(
        "channel",
        process.env.VUE_APP_VIDEO_MUSETW +
          "&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
    },
    huya_chunhua: function () {
      this.museActive = false;
      this.huya_chunhua_Active = true;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = false;
      this.okActive = false;
      this.fc2Active = false;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_HUYA_CHUNHUA
      );
      localStorage.setItem("channel", process.env.VUE_APP_VIDEO_HUYA_CHUNHUA);
    },
    huya_tennis: function () {
      this.museActive = false;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = true;
      this.huya_labi_Active = false;
      this.okActive = false;
      this.fc2Active = false;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_HUYA_TENNIS
      );
      localStorage.setItem("channel", process.env.VUE_APP_VIDEO_HUYA_TENNIS);
    },
    huya_labi: function () {
      this.museActive = false;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = true;
      this.okActive = false;
      this.fc2Active = false;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_HUYA_LABI
      );
      localStorage.setItem("channel", process.env.VUE_APP_VIDEO_HUYA_LABI);
    },
    to_ok: function () {
      this.museActive = false;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = false;
      this.okActive = true;
      this.fc2Active = false;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_OK + "?nochat=1&autoplay=1"
      );
      localStorage.setItem(
        "channel",
        process.env.VUE_APP_VIDEO_OK + "?nochat=1&autoplay=1"
      );
    },
    to_fc2: function () {
      this.museActive = false;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = false;
      this.okActive = false;
      this.fc2Active = true;
      this.musicActive = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_FC2 +
          "&lang=tw&suggest=1&thumbnail=1&adultaccess=1"
      );
      localStorage.setItem(
        "channel",
        process.env.VUE_APP_VIDEO_FC2 +
          "&lang=tw&suggest=1&thumbnail=1&adultaccess=1"
      );
    },
    to_music: function () {
      this.museActive = false;
      this.huya_chunhua_Active = false;
      this.huya_tennis_Active = false;
      this.huya_labi_Active = false;
      this.okActive = false;
      this.fc2Active = false;
      this.musicActive = true;
      this.$store.commit(
        "statecenter/setChannelURL",
        process.env.VUE_APP_VIDEO_MUSIC +
          "&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
      localStorage.setItem(
        "channel",
        process.env.VUE_APP_VIDEO_MUSIC +
          "&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
    },
  },
};
</script>
<style>
.main {
  display: grid;
  grid-template-columns: 80% 20%;
}
@media (max-aspect-ratio: 3/2) {
  .main {
    grid-template-columns: 70% 30%;
  }
}
@media screen and (max-width: 900px) {
  .main {
    grid-template-columns: none;
    grid-template-rows: 200px 1fr;
  }
}
.text-head {
  grid-template-columns: 6rem 8.5rem 1fr;
}
.channel-switcher {
  display: grid;
  display: none;
  position: fixed;
  overflow: hidden;
  right: 20%;
}
.media-body {
  z-index: 2;
}
.container_for_main .chat-body {
  height: calc(100vh - 70px);
}
.container_for_main .text-content {
  max-height: calc(100vh - 175px);
}
.container_for_main .list-body {
  max-height: calc(100vh - 175px);
}
</style>
