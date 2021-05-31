<template>
  <div class="user">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <!-- <h3>使用者頁面</h3> -->
    <div class="user-body" v-if="pageLoad">
      <Card class="cardarea" :key="componentKey" v-if="ownerpage">
        <template #header>
          <img
            v-if="picshow == true"
            class="userimg"
            v-bind:src="showUserImg()"
          />
          <img
            v-else
            class="userimg"
            v-bind:src="require(`@/static/image/${getDefaultImg(id)}`)"
          />
          <div>
            <Button icon="pi pi-image" label="變更圖片" @click="openUpload" />
          </div>
        </template>
        <template #title>
          <span class="level">{{ level }}</span> {{ name }}
        </template>
        <template #subtitle> 目前稱號：87 </template>
        <template #content>
          <p class="userinfobox">
            <span class="column-name">信箱</span
            ><span class="column">{{ email }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">點數</span
            ><span class="column">{{ point }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">註冊狀態</span
            ><span class="column">{{ status }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">註冊日期</span
            ><span class="column">{{ createdate }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">最後上線</span
            ><span class="column">{{ lastdate }}</span>
          </p>
        </template>

        <template #footer>
          <!-- <Button icon="pi pi-check" label="Save" />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-left: 0.5em"
          /> -->
        </template>
      </Card>

      <Card class="cardarea" :key="componentKey" v-else>
        <template #header>
          <img
            v-if="picshow == true"
            class="userimg"
            v-bind:src="showUserImg()"
          />
          <img
            v-else
            class="userimg"
            v-bind:src="require(`@/static/image/${getDefaultImg(id)}`)"
          />
          <div></div>
        </template>
        <template #title>
          <span class="level">{{ level }}</span> {{ name }}
        </template>
        <template #subtitle> 目前稱號：87 </template>
        <template #content>
          <p class="userinfobox">
            <span class="column-name">信箱</span
            ><span class="column">{{ hideEmail }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">點數</span
            ><span class="column">{{ point }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">註冊狀態</span
            ><span class="column">{{ status }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">註冊日期</span
            ><span class="column">{{ createdate }}</span>
          </p>
          <p class="userinfobox">
            <span class="column-name">最後上線</span
            ><span class="column">{{ lastdate }}</span>
          </p>
        </template>

        <template #footer>
          <!-- <Button icon="pi pi-check" label="Save" />
          <Button
            icon="pi pi-times"
            label="Cancel"
            class="p-button-secondary"
            style="margin-left: 0.5em"
          /> -->
        </template>
      </Card>
    </div>
  </div>

  <Dialog v-model:visible="uploadModal">
    <template v-if="uploading == false" #header>
      <h3>選取圖片</h3>
    </template>

    <template v-else #header>
      <h3>上傳中...</h3>
    </template>

    <FileUpload
      v-if="uploading == false"
      name="demo[]"
      @uploader="uploadImg"
      accept="image/*"
      :fileLimit="1"
      :maxFileSize="1500000"
      invalidFileSizeMessage="{0}: 檔案過大, 圖檔大小必須小於 {1}。"
      chooseLabel="選擇"
      uploadLabel="上傳"
      :showCancelButton="false"
      :previewWidth="200"
      :customUpload="true"
    >
      <template #empty>
        <p>請按鈕選擇或拖曳一張圖片到此</p>
      </template>
    </FileUpload>
    <ProgressSpinner v-else />
  </Dialog>
</template>
<script>
import QuickLink from "@/components/QuickLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import FileUpload from "primevue/fileupload";
import axios from "axios";
import { endpoint } from "../utils/endpoint.js";

export default {
  data() {
    return {
      componentKey: 0,
      id: "",
      name: "",
      level: "",
      email: "",
      point: "",
      status: "",
      createdate: "",
      lastdate: "",
      pic: "",
      picshow: false,
      uploading: false,
      uploadModal: false,
      ownerpage: false,
      pageLoad: false,
    };
  },
  watch: {
    "$store.state.ws.userKey": function () {
      if (this.id == this.$store.state.ws.userKey) {
        this.ownerpage = true;
        this.forceRerender();
      }
    },
  },
  computed: {
    uploadURL: function () {
      return endpoint + "chat/rest/v1/utilAPI/upload/single";
    },
    hideEmail: function () {
      if (this.email != "") {
        let name = this.email.substring(0, this.email.lastIndexOf("@"));
        let domain = this.email.substring(this.email.lastIndexOf("@") + 1);
        let replace_word =
          name.substring(0, 1) +
          name.substring(1).replaceAll(/[a-zA-z0-9]/g, "*");
        return replace_word + "@" + domain;
      } else return "";
    },
  },
  methods: {
    async userinfo(id) {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      const { data } = await axios.get(
        endpoint + "chat/rest/v1/userAPI/getUserById",
        {
          headers: headers,
          params: { id: id },
        }
      );
      if (data.id === 0) {
        this.id = data.id;
        this.name = "無此帳號";
        this.email = "";
        this.point = 0;
        this.level = "尚未註冊";
      } else {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.point = data.point;
        this.status = data.status;
        this.pic = data.userpic;
      }
      if (data.userpic != null) {
        this.picshow = true;
      }
      if (data.status === "A") {
        this.status = "已驗證";
      } else if (data.status === "N") {
        this.status = "未驗證";
      } else {
        this.status = "狀態未定義";
      }
      this.createdate = new Date(data.createdate).toLocaleDateString();
      this.lastdate = new Date(data.lastdate).toLocaleString();
      if (data.level === 9) {
        this.level = "站長";
      } else if (data.level === 8) {
        this.level = "管理員";
      } else if (data.level === 4) {
        this.level = "元老會員";
      } else if (data.level === 3) {
        this.level = "資深會員";
      } else if (data.level === 2) {
        this.level = "會員";
      }
      if (data.id == this.$store.state.ws.userKey) {
        this.ownerpage = true;
        this.forceRerender();
      }
      this.pageLoad = true;
    },
    openUpload() {
      this.uploadModal = true;
    },
    getDefaultImg(e) {
      let url = "epson_87.jpg";
      let index = e % 6;
      if (index == 0) {
        url = "black0.png";
      }
      if (index == 1) {
        url = "black1.png";
      }
      if (index == 2) {
        url = "black2.png";
      }
      if (index == 3) {
        url = "black3.png";
      }
      if (index == 4) {
        url = "black4.png";
      }
      if (index == 5) {
        url = "black5.png";
      }
      if (this.level == "管理員") {
        url = "blackSP.png";
      }
      return url;
    },
    showUserImg() {
      let prefix = "data:image/png;base64, ";
      return prefix + this.pic;
    },

    uploadImg(event) {
      this.uploading = true;
      let bodyFormData = new FormData();
      bodyFormData.append("imageFile", event.files[0]);

      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + this.$store.state.statecenter.token,
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(endpoint + "chat/rest/v1/utilAPI/upload/single", bodyFormData, {
          headers: headers,
        })
        .then((res) => {
          let data = res.data;
          this.pic = data.userpic;
          this.$store.commit("ws/setUserPic", data.minipic);

          if (res.status == "200") {
            // console.log("ok!!!");
            this.uploadModal = false;
            this.uploading = false;
            this.forceRerender();
          }
        });
    },
    forceRerender() {
      this.componentKey += 1;
    },
  },

  components: {
    QuickLink,
    Card,
    Button,
    Dialog,
    FileUpload,
    ProgressSpinner,
  },
  mounted() {
    this.userinfo(this.$route.params.userId);
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.ownerpage = false;
      this.picshow = false;
      this.pageLoad = false;
      this.userinfo(to.params.userId);
      next();
    }
  },
};
</script>
<style>
.user-body {
  z-index: 1;
  max-height: calc(94vh - 190px);
  overflow: overlay;
  text-align: -webkit-center;
}
.cardarea {
  margin-top: 3%;
  width: 90%;
}

.cardarea .userimg {
  width: 250px !important;
  height: 250px !important;
  margin: 5% 3% 3% 3%;
  object-fit: cover;
  height: 15rem;
}
.level {
  color: blue;
  font-size: 0.8rem;
  font-weight: normal;
  padding: 3px;
  border: solid;
  border-color: blue;
  border-radius: 7px;
}
.userinfobox {
  display: grid;
  grid-template-columns: 30% 70%;
  margin-left: 10%;
  margin-right: 10%;
}
.userinfobox .column-name {
  text-align-last: justify;
  padding-left: 0%;
  padding-right: 0%;
}
.userinfobox .column {
  text-align: -webkit-left;
  padding-left: 5%;
  word-break: break-word;
}
@media screen and (min-width: 900px) {
  .cardarea {
    display: grid;
    grid-template-columns: 30% 70%;
    width: 1000px;
  }
  .cardarea .userimg {
    margin: 25% 3% 10% 3% !important;
  }
  .userinfobox .column-name {
    padding-left: 25%;
    padding-right: 25%;
  }
}
.p-fileupload-row > div:nth-child(1) > img:nth-child(1) {
  width: 250px !important;
  height: 250px !important;
  object-fit: cover;
}
.p-fileupload-row > div:nth-child(2) {
  display: none;
}
.p-fileupload-row > div:nth-child(3) {
  display: none;
}
</style>