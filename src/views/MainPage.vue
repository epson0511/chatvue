<template>
  <div class="main">
    <div class="media-body">
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
  },
};
</script>
<style>
.main {
  display: grid;
  grid-template-columns: 80% 20%;
}
</style>
