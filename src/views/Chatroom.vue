<template>
  <div class="chat-body">
    <ChatRoom :key="componentKey"></ChatRoom>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from "@/components/ChatRoom.vue";

export default {
  name: "chatroom",
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
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
<style>
.chatroom {
  /* position: absolute; */
  /* left: 0;
  bottom: 0; */
  /* height: 100px; */
  /* padding-top: 100px;
  padding-bottom: 100px; */
  /* width: 100%;
  height: 100%; */
  /* overflow: hidden; */
  background: #dfdcc9;
}
.chat-body {
  background-color: whitesmoke;
  display: grid;
  height: 100%;
  grid-template-rows: 48px 1fr 55px;
  height: calc(100vh - 90px);
}
</style>
