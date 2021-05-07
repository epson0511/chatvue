<template>
  <div class="home">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <div class="home-title">愛普森重返農藥</div>
    <div class="home-body">
      <div class="text-area">
        <Panel header="雜談">
          <p>● 據說是所謂的愛普森直播</p>
          <p>● 這邊基本會有柯南、獵人、棋靈王、中華一番或美食劇之類的東東</p>
          <p>
            ●
            目前ahpha版註冊無限制，而且還有很多功能待開發，比如說現在我也不能ban人之類的，等規則訂好之後會刪檔建立正式資料(那就是beta版的事了)
          </p>
          <p>● 目標是建立一個小眾社群，在這邊有一個輕鬆的聚集地</p>
        </Panel>
        <br />
        <Panel header="待開發">
          <p>1. 個人資料頁面編輯</p>
          <p>2. 頭像上傳與頭像顯示</p>
          <p>3. 貼圖</p>
          <p>4. 人物認領或tag稱號之類的東西</p>
          <p>5. 吉祥物設計</p>
          <p>6. 自動從YT點播影片功能</p>
          <p>7. 想到再繼續寫</p>
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/1jHpJMbouZ_thJBV0gPoHE3Xq9YmFNqMtKTh6QwcQy70"
          >
            <span style="color: blue">歡迎提供想法</span>
          </a>
        </Panel>
        <br />
        <Panel header="已知問題">
          <p>1. 寄發驗證信問題</p>
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/1jHpJMbouZ_thJBV0gPoHE3Xq9YmFNqMtKTh6QwcQy70"
          >
            <span style="color: blue">歡迎回報</span>
          </a>
        </Panel>
        <br />
        <Panel header="開發日誌">
          <p>● UI / 愛普森</p>
          <p>● Front-end / 愛普森</p>
          <p>● back-end / 愛普森</p>
          <p>● GKE架設 / 愛普森</p>
          <p>● 特別致謝 / 愛普森</p>
          <p>蛤 就一人開發啊 阿不然咧</p>
        </Panel>
      </div>
    </div>
  </div>
</template>
<script>
import QuickLink from "@/components/QuickLink.vue";
import Panel from "primevue/panel";

export default {
  components: {
    QuickLink,
    Panel,
  },
};
</script>
<style>
.header {
  /* opacity: 0.8; */
}
.home-title {
  font-size: 2rem;
  margin: 1%;
}
.home-body {
  z-index: 1;
  max-height: calc(94vh - 190px);
  overflow: overlay;
}
.text-area {
  margin-left: 7%;
  margin-right: 7%;
}
.text-area .p-panel {
  text-align: left;
  font-size: 1.2rem;
  line-height: 30px;
}
</style>