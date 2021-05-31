import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import ToastService from 'primevue/toastservice';

// import Dialog from 'primevue/dialog';

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "primeflex/primeflex.scss";
import linkify from "vue-linkify";

const app = createApp(App);

app.use(store).use(router);
app.use(PrimeVue).directive("linkified", linkify);
app.use(ToastService);
// app.provide('$axios', axios);
// app.component('Dialog', Dialog);

app.mount("#app");
