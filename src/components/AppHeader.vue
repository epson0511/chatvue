<template>
  <div class="header">
    <div class="p-col-5">
      <div class="title-head" @click="openFrontPage">首頁</div>
    </div>
    <!-- <router-link to="/Chatroom">Chatroom</router-link> |
    <router-link to="/about">About</router-link> -->

    <div class="p-col-7">
      <div class="btn-head" v-if="token != null">
        <Button class="p-button-warning userbtn" type="button" @click="toggle"
          ><i class="pi pi-user" style="margin-right: 10px"></i
          >{{ username }}</Button
        >
        <Menu class="usermenu" ref="menu" :model="menuItem" :popup="true" />
      </div>
      <div class="btn-head" v-else>
        <Button
          label="Secondary"
          class="p-button-raised p-button-secondary"
          @click="openModalSignin"
          >註冊</Button
        >
        <Button
          label="Success"
          class="p-button-raised p-button-success"
          @click="openModalLogin"
          >登入</Button
        >
      </div>
    </div>
  </div>

  <Dialog
    header="註冊"
    v-model:visible="displaySignin"
    :modal="true"
    :closable="false"
    :breakpoints="{ '960px': '60vw', '640px': '100vw' }"
    :style="{ width: '400px' }"
  >
    <div class="p-grid">
      <div class="p-field p-col-12">
        <label class="input-hander" for="nickname"
          >暱稱 - 日後可變更(建議不要超過7個字)</label
        >
        <InputText
          class="textbox"
          id="nickname"
          type="nickname"
          aria-describedby="nickname-help"
          v-model.trim="nickname"
          autofocus
          @focus="this.err.nickname = ''"
        />
        <span id="nickname-help" class="p-error err-hander">
          {{ err.nickname }}
        </span>
      </div>
      <div class="p-field p-col-12">
        <label class="input-hander" for="email">信箱 - 將設定為登入帳號</label>
        <InputText
          class="textbox"
          id="email"
          type="email"
          aria-describedby="email-help err-hander"
          @blur="emailChecker"
          @focus="this.err.email = ''"
          v-model.trim="email"
        />
        <span id="email-help" class="p-error err-hander">{{ err.email }}</span>
      </div>
      <div class="p-field p-col-12">
        <label class="input-hander" for="password">密碼 - 需介於6-10字元</label>
        <Password
          class="textbox"
          id="password"
          type="password"
          aria-describedby="password-help"
          v-model.trim="password"
          @focus="(this.err.password = ''), (this.err.passwordconfirm = '')"
        />
        <span id="password-help" class="p-error err-hander">{{
          err.password
        }}</span>
      </div>
      <div class="p-field p-col-12">
        <label class="input-hander" for="passwordcheck">確認密碼</label>
        <Password
          class="textbox"
          :feedback="false"
          id="passwordcheck"
          type="password"
          aria-describedby="passwordcheck-help"
          v-model.trim="passwordconfirm"
          @focus="(this.err.password = ''), (this.err.passwordconfirm = '')"
        />
        <span id="passwordcheck-help" class="p-error err-hander">{{
          err.passwordconfirm
        }}</span>
      </div>
    </div>
    <template #footer>
      <Button
        label="取消"
        icon="pi pi-times"
        @click="closeModalSignin"
        class="p-button-text"
      />
      <Button label="確認" icon="pi pi-check" @click="signinbycheck" />
    </template>
  </Dialog>

  <Dialog
    header="登入"
    v-model:visible="dispalyLogin"
    :modal="true"
    :closable="false"
    :breakpoints="{ '960px': '50vw', '640px': '100vw' }"
    :style="{ width: '320px' }"
  >
    <div class="p-grid">
      <div class="p-field p-col-12">
        <label class="input-hander" for="usernamelogin"
          >帳號(您的電子信箱)</label
        >
        <div class="textbox">
          <InputText
            id="usernamelogin"
            type="username"
            aria-describedby="usernamelogin-help"
            autofocus
            style="width: 100%"
            v-model.trim="usernamelogin"
            @focus="
              (this.err.usernamelogin = ''), (this.err.passwordlogin = '')
            "
          />
          <span id="usernamelogin-help" class="p-error err-hander">{{
            err.usernamelogin
          }}</span>
        </div>
      </div>
      <div class="p-field p-col-12">
        <label class="input-hander" for="passwordlogin">密碼</label>
        <div class="textbox">
          <InputText
            id="passwordlogin"
            type="password"
            aria-describedby="passwordlogin-help"
            style="width: 100%"
            v-model.trim="passwordlogin"
            @focus="
              (this.err.usernamelogin = ''), (this.err.passwordlogin = '')
            "
          />
          <span id="passwordlogin-help" class="p-error err-hander">{{
            err.passwordlogin
          }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <Button
        label="取消"
        icon="pi pi-times"
        @click="closeModalLogin"
        class="p-button-text"
      />
      <Button label="確認" icon="pi pi-check" @click="loginbycheck" />
    </template>
  </Dialog>

  <Dialog
    header="驗證"
    v-model:visible="dispalySucSignin"
    :modal="true"
    :closable="false"
    :breakpoints="{ '960px': '50vw', '640px': '100vw' }"
    :style="{ width: '320px' }"
  >
    <div class="p-grid">
      <div class="p-field p-col-12">
        <label class="input-hander"
          >[請注意目前還不會寄信而且也沒啥好驗證的](您已註冊成功，可立即登入使用，系統已寄送一封驗證信至您的信箱，請驗證信箱以便啟用完整功能。)</label
        >
      </div>
    </div>
    <template #footer>
      <Button
        label="關閉"
        icon="pi pi-times"
        @click="closeModalSuccess"
        class="p-button-text"
      />
    </template>
  </Dialog>
</template>
<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import { validateEmail } from "../utils/tools.js";
import { endpoint } from "../utils/endpoint.js";
import axios from "axios";
import { forceColse } from "../utils/api";

export default {
  name: "app-head",
  data() {
    return {
      value1: null,
      displaySignin: false,
      dispalySucSignin: false,
      email: "",
      nickname: "",
      password: "",
      passwordconfirm: "",
      usernamelogin: "",
      passwordlogin: "",
      err: {
        nickname: "",
        email: "",
        password: "",
        passwordconfirm: "",
        usernamelogin: "",
        passwordlogin: "",
      },
      menuItem: [
        // {
        //   label: "Update",
        //   icon: "pi pi-refresh",
        //   command: () => {
        //     this.$toast.add({
        //       severity: "success",
        //       summary: "Updated",
        //       detail: "Data Updated",
        //       life: 3000,
        //     });
        //   },
        // },
        // {
        //   label: "Delete",
        //   icon: "pi pi-times",
        //   command: () => {
        //     this.$toast.add({
        //       severity: "warn",
        //       summary: "Delete",
        //       detail: "Data Deleted",
        //       life: 3000,
        //     });
        //   },
        // },
        // {
        //   label: "Vue Website",
        //   icon: "pi pi-external-link",
        //   url: "https://vuejs.org/",
        // },
        {
          label: "登出",
          icon: "pi pi-sign-out",
          command: () => {
            this.doLogout();
          },
        },
      ],
    };
  },
  computed: {
    dispalyLogin: {
      get() {
        return this.$store.state.statecenter.loginbox;
      },
      set(val) {
        this.$store.commit("statecenter/setLoginBox", val);
      },
    },
    token() {
      return this.$store.state.statecenter.token;
    },
    username() {
      let user = this.$store.state.ws.username;
      if (!user) return "";
      if (user.length > 8) {
        return user.slice(0, 8) + "...";
      }
      return user;
    },
  },
  // watch: {
  //   email: function (newVal) {
  //     this.emailChecker(newVal);
  //   },
  // },
  methods: {
    openFrontPage() {
      this.$router.push({ path: "/" });
    },
    openModalSignin() {
      this.displaySignin = true;
    },
    closeModalSignin() {
      this.displaySignin = false;
      this.nickname = "";
      this.email = "";
      this.password = "";
      this.passwordconfirm = "";
      this.err.nickname = "";
      this.err.email = "";
      this.err.password = "";
      this.err.passwordconfirm = "";
    },
    closeModalSuccess() {
      this.dispalySucSignin = false;
    },
    openModalLogin() {
      this.$store.commit("statecenter/setLoginBox", true);
    },
    closeModalLogin() {
      this.$store.commit("statecenter/setLoginBox", false);
      this.usernamelogin = "";
      this.passwordlogin = "";
      this.err.usernamelogin = "";
      this.err.passwordlogin = "";
    },
    async signinbycheck() {
      let count = 0;
      const verifiedemail = validateEmail(this.email);

      if (this.nickname === "") {
        this.err.nickname = "請輸入暱稱";
        count++;
      }
      if (this.email == "" || verifiedemail == false) {
        this.err.email = "請輸入有效信箱";
        count++;
      }
      if (this.password === "") {
        this.err.password = "請輸入密碼";
        count++;
      } else if (this.password.length < 6) {
        this.err.password = "密碼不得低於6字元";
        count++;
      } else if (this.password.length > 10) {
        this.err.password = "密碼不得超過10字元";
        count++;
      }
      if (this.passwordconfirm === "") {
        this.err.passwordconfirm = "請輸入密碼";
        count++;
      }
      if (this.passwordconfirm !== this.password) {
        this.err.password = "密碼不一致";
        this.err.passwordconfirm = "密碼不一致";
        count++;
      }
      await this.emailChecker();
      if (count == 0) {
        this.doSignin();
      }
    },
    async emailChecker() {
      const { data } = await axios.get(
        endpoint +
          "chat/rest/v1/userAPI/getUserByEmailForCheck?email=" +
          this.email
      );

      if (data == null) {
        if (validateEmail(this.email)) {
          this.err.email = "";
        } else {
          this.err.email = "請輸入有效信箱";
        }
      } else {
        this.err.email = "信箱已被使用";
      }
    },
    doSignin() {
      let params = {
        name: this.nickname,
        email: this.email,
        password: this.password,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      axios
        .post(
          endpoint + "chat/rest/v1/userAPI/doSignIn",
          JSON.stringify(params),
          {
            headers: headers,
          }
        )
        .then((res) => {
          if (res.data.status == "200") {
            this.closeModalSignin();
            this.dispalySucSignin = true;
          }
        });
    },
    loginbycheck() {
      let count = 0;

      if (this.usernamelogin === "") {
        this.err.usernamelogin = "請輸入註冊信箱";
        count++;
      }
      if (this.passwordlogin === "") {
        this.err.passwordlogin = "請輸入密碼";
        count++;
      }
      if (count == 0) {
        this.doLogin();
      }
    },
    async doLogin() {
      let params = {
        email: this.usernamelogin,
        password: this.passwordlogin,
      };
      const headers = {
        "Content-Type": "application/json",
        Authorization: "",
        "Access-Control-Allow-Origin": "*",
      };
      const { data } = await axios.post(
        endpoint + "chat/rest/v1/authAPI/auth",
        JSON.stringify(params),
        {
          headers: headers,
        }
      );

      if (data.status == 200) {
        console.log("登入成功");
        localStorage.setItem("token", data.token);
        forceColse();
        this.$store.commit("ws/resetMessageCollection");
        this.closeModalLogin();
        this.$store.commit("statecenter/setToken", data.token);
        this.setUserByToken();
      } else if (data.status == 401) {
        (this.passwordlogin = ""),
          (this.err.passwordlogin = "無此帳號或密碼錯誤");
        console.log("帳號密碼錯誤");
      } else {
        console.log(data);
      }
    },
    checkUser: function () {
      if (this.$store.state.statecenter.token === null) {
        console.log("token not exist");
      } else {
        console.log("token exist, verifying...");
        this.setUserByToken();
      }
    },
    async setUserByToken() {
      try {
        let params = {
          email: this.usernamelogin,
          password: this.passwordlogin,
        };
        const headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.$store.state.statecenter.token,
          "Access-Control-Allow-Origin": "*",
        };
        const { data } = await axios.post(
          endpoint + "chat/rest/v1/authAPI/authenticate",
          JSON.stringify(params),
          {
            headers: headers,
          }
        );
        console.log("verify success, now Login:" + data.account);
        this.$store.commit("ws/setUserkey", data.id);
        this.$store.commit("ws/setUsername", data.name);
        this.$store.commit("ws/setRank", data.level);
      } catch (error) {
        console.log(error.message);
        this.$store.commit("statecenter/setToken", null);
        localStorage.removeItem("token");
      }
    },
    doLogout() {
      forceColse();
      this.$store.commit("ws/resetMessageCollection");
      this.$store.commit("ws/setUserkey", "00000");
      this.$store.commit("ws/setUsername", "");
      this.$store.commit("statecenter/setToken", null);
      this.$store.commit("ws/setRank", 0);
      localStorage.removeItem("token");
    },
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
  },
  mounted() {
    this.checkUser();
  },

  components: {
    Button,
    Dialog,
    InputText,
    Password,
    Menu,
  },
};
</script>
<style lang="scss">
.top {
  // position: absolute;
  // left: 0;
  // top: 0;
  // height: 80px;
  // width: 100%;
  // overflow: hidden;
  // background: rgb(226, 167, 39);
  // z-index: 1;
}
.header {
  background-color: #e2a727;
  display: flex;
  place-items: center;
  justify-content: flex-end;
  padding: 0 50px;
}

.btn-head {
  // position: relative;
  // left: 34%;
  // bottom: 20px;
  width: 100%;
  overflow: hidden;
  text-align: right;
}
.title-head {
  float: left;
  font-size: 2em;
}
.p-field {
  margin-bottom: 0 !important;
  margin-top: 0.1rem;
}
.textbox {
  width: 100%;
}
.err-hander {
  float: left;
  font-size: 5px;
  height: 16px;
  width: 100%;
  text-align: -webkit-left;
  // visibility: hidden;
}
.input-hander {
  float: left;
}
.usermenu,
.userbtn {
  // width: 9rem !important;
  // position: relative;
  // display: inline-block !important;
}
// #nav {
//   padding: 5px;
//   padding-right: 4%;
//   // position: relative;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>