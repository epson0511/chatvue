<template>
  <div class="main">
    <div class="media-body">
      <div class="channel-switcher">
        <Button
          v-bind:class="museActive ? active : notactive"
          @click="to_musetw"
          >木棉圖</Button
        >
        <Button
          v-bind:class="museytActive ? active : notactive"
          @click="to_museyt"
          >木棉油</Button
        >
        <Button v-bind:class="affActive ? active : notactive" @click="to_aff"
          >柯南主</Button
        >
        <Button v-bind:class="fc2Active ? active : notactive" @click="to_fc2"
          >柯南副</Button
        >
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
      museytActive: false,
      affActive: false,
      fc2Active: false,

      active: {
        ["p-button-outlined"]: false,
        ["p-button-help"]: true,
      },
      notactive: {
        ["p-button-outlined"]: true,
        ["p-button-help"]: true,
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
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },

    to_musetw: function () {
      this.museActive = true;
      this.museytActive = false;
      this.affActive = false;
      this.fc2Active = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://player.twitch.tv/?channel=muse_tw&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
      localStorage.setItem(
        "channel",
        "https://player.twitch.tv/?channel=muse_tw&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
    },
    to_museyt: function () {
      this.museActive = false;
      this.museytActive = true;
      this.affActive = false;
      this.fc2Active = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://www.youtube.com/watch?v=g4VsBph9cTQ"
      );
      localStorage.setItem(
        "channel",
        "https://www.youtube.com/watch?v=g4VsBph9cTQ"
      );
    },
    to_aff: function () {
      this.museActive = false;
      this.museytActive = false;
      this.affActive = true;
      this.fc2Active = false;
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://play.afreecatv.com/kalelujp/232923384/embed"
      );
      localStorage.setItem(
        "channel",
        "https://play.afreecatv.com/kalelujp/232923384/embed"
      );
    },
    to_fc2: function () {
      this.museActive = false;
      this.museytActive = false;
      this.affActive = false;
      this.fc2Active = true;
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://live.fc2.com/embedPlayer/?id=64589205&lang=tw&suggest=1&thumbnail=1&adultaccess=1"
      );
      localStorage.setItem(
        "channel",
        "https://live.fc2.com/embedPlayer/?id=64589205&lang=tw&suggest=1&thumbnail=1&adultaccess=1"
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
@media screen and (max-width: 900px) {
  .main {
    grid-template-columns: none;
    grid-template-rows: 200px 1fr;
  }
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
