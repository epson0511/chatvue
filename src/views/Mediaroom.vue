<template>
  <div class="mediaroom">

    <div class="video-container">
      <iframe
        class="video"
        src="https://www.youtube.com/embed/cGTXuyqIwMAA"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>
<script>
</script>

<style>
.mediaroom {
  position: absolute;
  left: 0;
  bottom: 0;
  /* height: 100px; */
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #ddedf3;
  padding-right: 0 !important;
  
}
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
   transform: translate(0, 8%);
  
}
.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  
}
</style>