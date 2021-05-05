<template>
  <div class="main">
    <div class="media-body">
      <div class="channel-switcher">
        <div @click="to_musetw">木棉花</div>
        <div @click="to_fc2">柯南台</div>
        <div @click="to_vl">失效</div>
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

export default {
  name: "mainpage",
  data() {
    return {
      componentKey: 0,
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
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
    to_musetw: function () {
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://player.twitch.tv/?channel=muse_tw&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
    },
    to_fc2: function () {
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://live.fc2.com/embedPlayer/?id=64589205&lang=tw&suggest=1&thumbnail=1&adultaccess=0"
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
.channel-switcher {
  display: grid;
  display: inline-flex;
  position: fixed;
  overflow: hidden;
  right: 20%;
}
</style>
