<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <ChatRoom></ChatRoom>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import ChatRoom from '@/components/ChatRoom.vue'

export default {
  name: 'Home',
  components: {
    ChatRoom
  }
}
</script>
<style>
.home{
    position: absolute;
    left: 0;
    bottom: 0;
    /* height: 100px; */
    padding-top: 100px;
    padding-bottom: 100px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  background: #dfdcc9;
}
</style>
