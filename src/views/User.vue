<template>
  <div class="user">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <!-- <h3>使用者頁面</h3> -->
    <div class="user-body">
      <Card class="cardarea">
        <template #header>
          <img
            class="userimg"
            src="@/static/image/epson_87.jpg"
            style="height: 15rem"
          />
          <div>
            <Button icon="pi pi-image" label="變更圖片" />
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
    </div>
  </div>
</template>
<script>
import QuickLink from "@/components/QuickLink.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import axios from "axios";
import { endpoint } from "../utils/endpoint.js";

export default {
  data() {
    return {
      name: "",
      level: "",
      email: "",
      point: "",
      status: "",
      createdate: "",
      lastdate: "",
    };
  },
  computed: {
    // isTexted: function () {
    //   return this.message.length > 0 ? false : true;
    // },
  },
  methods: {
    async userinfo() {
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      const { data } = await axios.get(
        endpoint + "chat/rest/v1/userAPI/getUserById",
        {
          headers: headers,
          params: { id: this.$route.params.userId },
        }
      );

      this.name = data.name;
      this.email = data.email;
      this.point = data.point;
      this.status = data.status;
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
      } else if (data.level === 9) {
        this.level = "管理員";
      } else if (data.level === 4) {
        this.level = "元老會員";
      } else if (data.level === 3) {
        this.level = "資深會員";
      } else if (data.level === 2) {
        this.level = "會員";
      }
    },
  },
  components: {
    QuickLink,
    Card,
    Button,
  },
  beforeMount() {
    this.userinfo();
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
  width: 70%;
}

.cardarea .userimg {
  width: 200px !important;
  height: 200px !important;
  margin: 5% 3% 3% 3%;
  object-fit: cover;
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
}
.userinfobox .column-name {
  text-align-last: justify;
  padding-left: 0%;
  padding-right: 0%;
}
.userinfobox .column {
  text-align: -webkit-left;
  padding-left: 5%;
}
@media screen and (min-width: 900px) {
  .cardarea {
    display: grid;
    grid-template-columns: 30% 70%;
  }
  .cardarea .userimg {
    margin: 25% 3% 10% 3% !important;
  }
  .userinfobox .column-name {
    padding-left: 25%;
    padding-right: 25%;
  }
}
</style>