<template>
  <div class="VerifyMail">
    <div class="quicklinkdiv">
      <QuickLink></QuickLink>
    </div>
    <h1>信箱驗證中...</h1>
    <div class="process">
      <span></span>
      <ProgressBar mode="indeterminate" />
    </div>
    <span></span>
  </div>
  <div>
    {{ result }}
  </div>
</template>
<script>
import QuickLink from "@/components/QuickLink.vue";
import ProgressBar from "primevue/progressbar";
import axios from "axios";
import { endpoint } from "../utils/endpoint.js";

export default {
  data() {
    return {
      result: "",
      err: {
        result: "",
      },
    };
  },
  components: {
    QuickLink,
    ProgressBar,
  },
  methods: {
    verified(email) {
      if (email.trim() === "") {
        return;
      }
      let params = {
        email: email,
      };
      const headers = {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + this.$store.state.statecenter.token,
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(
          endpoint + "chat/rest/v1/userAPI/confirmUser",
          JSON.stringify(params),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res.status == "200") {
            this.$swal({
              icon: "success",
              title: "信箱驗證成功！",
              confirmButtonText: '<i class="fa fa-thumbs-up"></i> 確認',
            }).then(() => {
              if (this.$store.state.ws.userKey != '00000') {
                this.$router.push({
                  path: "/user/" + this.$store.state.ws.userKey,
                });
              } else {
                this.$router.push({ path: "/" });
              }
            });
          }
        });
    },
  },
  mounted() {
    let now = Date.now();
    let link_time = this.$route.params.email.slice(-13);
    if (now - link_time > 86400000) {
      this.$swal({
        icon: "warning",
        title: "驗證碼已過期",
        text: "請重新回到個人頁面寄送驗證信",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> 確認',
      }).then(() => {
        this.$router.push({ path: "/" });
      });
    } else {
      this.verified(this.$route.params.email.slice(0, -13));
    }
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
.process {
  /* width: 50%; */
  display: grid;
  grid-template-columns: 25% 50% 25%;
}
</style>