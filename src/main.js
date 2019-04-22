import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import parse from "@/vendors/parse/main.js";

Vue.config.productionTip = false;
Vue.prototype.$api = parse;

export const eventBus = new Vue ();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
