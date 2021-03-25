import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
// import Dialog from 'primevue/dialog';


import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import 'primeflex/primeflex.scss';

const app = createApp(App);

app.use(store).use(router)
app.use(PrimeVue)
// app.provide('$axios', axios);
// app.component('Dialog', Dialog);

app.mount('#app')

