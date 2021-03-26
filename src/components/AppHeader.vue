<template>
  <div>This is Header block</div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>

    <div class="btn-head">
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
        <label for="nickname">暱稱 - 日後可變更</label>
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
        <label for="email">信箱 - 將設定為登入帳號</label>
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
        <label for="password">密碼</label>
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
        <label for="passwordcheck">確認密碼</label>
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
      <Button label="確認" icon="pi pi-check" @click="finalcheck" />
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
        <label for="usernamelogin">帳號(您的電子信箱)</label>
        <div class="textbox">
          <InputText
            id="usernamelogin"
            type="username"
            aria-describedby="usernamelogin-help"
            autofocus
            style="width: 100%"
            v-model.trim="usernamelogin"
          />
          <span id="usernamelogin-help" class="p-error err-hander">{{
            err.usernamelogin
          }}</span>
        </div>
      </div>
      <div class="p-field p-col-12">
        <label for="passwordlogin">密碼</label>
        <div class="textbox">
          <InputText
            id="passwordlogin"
            type="password"
            aria-describedby="passwordlogin-help"
            style="width: 100%"
            v-model.trim="passwordlogin"
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
      <Button label="確認" icon="pi pi-check" @click="dologin" />
    </template>
  </Dialog>
</template>
<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import { validateEmail } from "../utils/tools.js";
import axios from "axios";

export default {
  name: "app-head",
  data() {
    return {
      value1: null,
      displaySignin: false,
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
    };
  },
  computed: {
    dispalyLogin: {
      get() {
        return this.$store.state.statecenter.login;
      },
      set(val) {
        this.$store.commit("statecenter/setLogin", val);
      },
    },
  },
  // watch: {
  //   email: function (newVal) {
  //     this.emailChecker(newVal);
  //   },
  // },
  methods: {
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
    openModalLogin() {
      this.$store.commit("statecenter/setLogin", true);
    },
    closeModalLogin() {
      this.$store.commit("statecenter/setLogin", false);
      this.usernamelogin = "";
      this.passwordlogin = "";
      this.err.usernamelogin = "";
      this.err.passwordlogin = "";
    },
    async finalcheck() {
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
        "http://localhost:8082/chat/rest/v1/userAPI/getUserByEmailForCheck?email=" +
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
        console.log(data);
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
          "http://localhost:8082/chat/rest/v1/userAPI/doSignIn",
          JSON.stringify(params),
          {
            headers: headers,
          }
        )
        .then((res) => console.log(res.data));
    },
    dologin() {
      if (this.usernamelogin === "") {
        this.err.usernamelogin = "請輸入註冊信箱";
      }
      if (this.passwordlogin === "") {
        this.err.passwordlogin = "請輸入密碼";
      }
    },
  },

  components: {
    Button,
    Dialog,
    InputText,
    Password,
  },
};
</script>
<style lang="scss">
.top {
  position: absolute;
  left: 0;
  top: 0;
  height: 80px;
  width: 100%;
  overflow: hidden;
  background: rgb(226, 167, 39);
  z-index: 99;
}
.btn-head {
  position: absolute;
  left: 34%;
  bottom: 20px;
  width: 100%;
  overflow: hidden;
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
  // visibility: hidden;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>