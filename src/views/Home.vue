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
          <p>
            ●
            本站僅提供聊天與各種社交互動，吐槽影片區會從站外找資源嵌入，並非由本站提供，基本會找目前熱門的作品，或柯南、獵人、棋靈王、中華一番或美食劇之類的東東
          </p>
          <p>
            ●
            目前alpha版註冊無限制，且還有諸多功能待開發實作，封測結束會刪檔重來
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
          <div>● 2021.05.13</div>
          <p style="margin-left: 7%">
            1. 修正發言重複顯示的問題<br />
            2. 重整後會停留在最後收看的頻道<br />
            3. 超連結識別<br />
            4. 字體客製化調整大小<br />
          </p>
          <div>● 2021.05.10</div>
          <p style="margin-left: 7%">
            1. 修正了進入頁面卷軸不會拉到底的問題<br />
            2. 新增發言時間<br />
            3. 顏色新增3種，含山村綠<br />
          </p>

          <div>● 2021.05.07</div>
          <p style="margin-left: 7%">Alpha(2.3)版本 發佈<br /></p>
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