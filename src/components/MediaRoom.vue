<template>
  <div class="mediaroom">
    <!-- <div class="video-container"> -->
    <iframe
      class="video-container"
      src="https://www.youtube.com/embed/wHNKtYo68Eo"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <!-- <iframe
      class="video-container"
      src="https://player.twitch.tv/?channel=muse_tw&muted=false&autoplay=true&parent=localhost"
      frameborder="0"
      allowfullscreen
    ></iframe> -->
    <!-- </div> -->
  </div>
</template>
<script>
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
/* .video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
} */
</style>