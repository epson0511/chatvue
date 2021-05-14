<template>
  <div class="mediaroom">
    <!-- <div class="video-container"> -->
    <!-- <iframe
      class="video-container"
      src="https://www.youtube.com/embed/wHNKtYo68Eo"
      frameborder="0"
      allowfullscreen
    ></iframe> -->
    <iframe
      class="video-container"
      v-bind:src="url"
      frameborder="0"
      allowfullscreen
      allow="autoplay"
    ></iframe>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    url: function () {
      return this.$store.state.statecenter.channelURL;
    },
  },
  mounted() {
    if (
      this.$store.state.statecenter.channelURL == null ||
      this.$store.state.statecenter.channelURL == ""
    ) {
      this.$store.commit(
        "statecenter/setChannelURL",
        "https://player.twitch.tv/?channel=muse_tw&muted=false&autoplay=true&parent=" +
          location.host.split(":")[0]
      );
    }
  },
  methods: {},
};

// import ''
// var options = {
//   width: 854,
//   height: 480,
//   channel: "muse_tw",
//   // Only needed if this page is going to be embedded on other websites
//   parent: ["beika.city", "www.beika.city"]
// };
// var player = new Twitch.Player("SamplePlayerDivID", options);
// player.setVolume(0.5);
</script>

<style>
.mediaroom {
  /* position: absolute; */
  left: 0;
  /* bottom: 0; */
  /* height: 100px; */
  /* padding-top: 100px; */
  /* padding-bottom: 100px; */
  width: 100%;
  height: 100%;
  background: black;
  display: grid;
  grid-template-rows: auto;
  /* grid-template-columns: repeat(4, 1fr); */
  grid-gap: 0px;
}
.video-container {
  /* position: relative;
  height: 0;
  padding-top: 53.8%;
  overflow: hidden;
  align-self: center;
  padding-top: 56.25%;
  transform: translate(0, 8%); */
  width: 100%;
  height: 100%;
}
.media-body:hover .channel-switcher {
  display: inline-flex;
}

@keyframes switcher-pushin {
  0% {
    height: 0%;
  }
  100% {
    height: 39px;
  }
}

.media-body:hover .channel-switcher {
  animation: switcher-pushin 0.8s;
}
/* .video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
} */
</style>