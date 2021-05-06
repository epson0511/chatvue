<template>
  <div class="home">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <div class="home-title">歡迎回到米花市</div>
    <div class="home-body">
      <div class="text-area">
        <Panel header="雜談">
          米花市重返農藥！如果迷路請按左上角首頁回來此頁尋找路徑。設計上盡量弄成與之前很像的介面，目前只有提供觀看與打字聊天的功能，說不定還bug一堆，隨機被玩壞。因為現在是alpha版，之後應該會刪除檔案，所以隨便註冊無所謂，驗證信箱現在有問題信還寄不出去，遇到問題請直接line群組回報，一人開發超沒良心，可能半年後才會beta版。
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
          <p style="color: blue">歡迎提供想法</p>
        </Panel>
        <br />
        <Panel header="已知問題">
          <p>1. 寄發驗證信問題</p>
          <p style="color: blue">歡迎回報</p>
        </Panel>
        <br />
        <Panel header="開發日誌">
          <p>● front-end Vue 3.0</p>
          <p>● back-end SpringBoot</p>
          <p>● DB MySQL</p>
          <p>● build Docker</p>
          <p>● Cluster(VM) GKE by GCP</p>
          待實做架構
          <p>● certificate cert-manager(auto renew ssl certificate)</p>
          <p>● NoSQL redis</p>
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