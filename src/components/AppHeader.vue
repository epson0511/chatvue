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
        <label for="nickname">暱稱</label>
        <InputText
          class="textbox"
          id="nickname"
          type="nickname"
          aria-describedby="nickname-help"
          autofocus
        />
      </div>
      <div class="p-field p-col-12">
        <label for="email">信箱</label>
        <InputText
          class="textbox"
          id="email"
          type="email"
          aria-describedby="email-help"
          @blur="emailChecker"
          v-model.trim="email"
        />
        <small
          v-bind:style="{ visibility: visibility }"
          id="email-help"
          class="p-error"
          >信箱已被使用</small
        >
      </div>
      <div class="p-field p-col-12">
        <label for="password">密碼</label>
        <Password
          class="textbox"
          id="password"
          type="password"
          aria-describedby="password-help"
        />
      </div>
      <div class="p-field p-col-12">
        <label for="passwordcheck">確認密碼</label>
        <Password
          class="textbox"
          :feedback="false"
          id="passwordcheck"
          type="password"
          aria-describedby="passwordcheck-help"
        />
      </div>
    </div>
    <template #footer>
      <Button
        label="取消"
        icon="pi pi-times"
        @click="closeModalSignin"
        class="p-button-text"
      />
      <Button label="確認" icon="pi pi-check" @click="closeModalSignin" />
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
        <label for="usernamelogin">帳號(電子信箱)</label>
        <div class="textbox">
          <InputText
            id="usernamelogin"
            type="username"
            aria-describedby="usernamelogin-help"
            autofocus
            style="width:100%"
          />
        </div>
      </div>
      <div class="p-field p-col-12">
        <label for="passwordlogin">密碼</label>
        <div class="textbox">
          <InputText
            id="passwordlogin"
            type="password"
            aria-describedby="passwordlogin-help"
            style="width:100%"
          />
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
      <Button label="確認" icon="pi pi-check" @click="closeModalLogin" />
    </template>
  </Dialog>
</template>
<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import axios from "axios";

export default {
  name: "app-head",
  data() {
    return {
      value1: null,
      displaySignin: false,
      email: "",
      emailused: "hidden",
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
    visibility: function () {
      return this.emailused;
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
    },
    openModalLogin() {
      this.$store.commit("statecenter/setLogin", true);
    },
    closeModalLogin() {
      this.$store.commit("statecenter/setLogin", false);
    },
    emailChecker() {
      console.log(this.email);
      axios
        .get(
          "http://localhost:8082/chat/rest/v1/userAPI/getUserByEmailForCheck?email=" +
            this.email
        )
        .then((res) => {
          if (res.data == null) {
            this.emailused = "hidden";
            console.log("無此帳號");
          } else {
            this.emailused = "visible";
            console.log(res.data);
          }
        });
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
#email-help {
  float: right;
  visibility: hidden;
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