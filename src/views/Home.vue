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
          <p>1. 個人資料頁面編輯 (in process)</p>
          <p>2. 人物認領或tag稱號之類的東西</p>
          <p>3. 吉祥物設計</p>
          <p>4. 自動從YT點播影片功能</p>
          <p>5. 想到再繼續寫</p>
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/1jHpJMbouZ_thJBV0gPoHE3Xq9YmFNqMtKTh6QwcQy70"
          >
            <span style="color: blue">歡迎提供想法</span>
          </a>
        </Panel>
        <br />
        <Panel header="已知問題">
          <!-- <p>1. 寄發驗證信問題</p> -->
          <a
            target="_blank"
            href="https://docs.google.com/forms/d/1jHpJMbouZ_thJBV0gPoHE3Xq9YmFNqMtKTh6QwcQy70"
          >
            <span style="color: blue">歡迎回報</span>
          </a>
        </Panel>
        <br />
        <Panel header="開發日誌">
          <div>● 2021.07.21 (alpha-3.1)</div>
          <p style="margin-left: 7%">
            1. 現在可驗證信箱<br />
            2. 顯示最後登入時間<br />
            3. 掛在聊天室將會累積點數<br />
          </p>
          <div>● 2021.07.19 (alpha-2.9)</div>
          <p style="margin-left: 7%">
            1. 優化主視窗拖拉比例<br />
            2. 可更改使用者暱稱<br />
          </p>
          <div>● 2021.05.31 (alpha-2.8)</div>
          <p style="margin-left: 7%">
            1. 貼圖功能<br />
            2. 僅聊天頁之登入推播樣式更改為全版<br />
          </p>
          <div>● 2021.05.26 (alpha-2.7)</div>
          <p style="margin-left: 7%">
            1. 允許同帳號多重登入<br />
            2. 線上列表顯示頭貼<br />
            3. 進入聊天室推播通知<br />
          </p>
          <div>● 2021.05.23 (alpha-2.6)</div>
          <p style="margin-left: 7%">
            1. 個人圖片上傳功能(1.5MB)<br />
            2. 聊天室使用者名稱可以點進個人頁面<br />
            3. 密碼上限改為20字元<br />
          </p>
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
  mounted() {
    this.$toast.add({
      severity: "warn",
      // summary: "登入",
      detail: " 進入聊天室！",
      closable: false,
      group: "chatroom_greeting",
      life: 40000,
    });
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
  /* overflow: overlay; */
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
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