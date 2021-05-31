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
