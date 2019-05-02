import Vue from 'vue'
import App from './app.vue'
import router from './router'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Parse from "parse";
import store from '@/store/index.js';

Parse.initialize ("Ox33tQSpiscXrVvf4HKXsduw2ProZNCysXXGY5zT");
Parse.serverURL = 'https://parse.protype.tw/parse';

Vue.config.productionTip = false;

new Vue ({
  router,
  store,
  render: h => h (App)
}).$mount ('#app')
