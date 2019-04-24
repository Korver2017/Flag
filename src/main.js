import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Parse from "parse";

Parse.initialize ("Ox33tQSpiscXrVvf4HKXsduw2ProZNCysXXGY5zT");
Parse.serverURL = 'https://parse.protype.tw/flag';

Vue.config.productionTip = false;

export const eventBus = new Vue ();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
