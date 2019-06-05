import Vue from 'vue'
import App from './app.vue'
import router from './router'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Parse from "parse";
import store from '@/store/index.js';
import VueMarkdown from "vue-markdown";
import md5 from "js-md5";
import jsrsasign from "jsrsasign";
import jsCookie from "js-cookie";
import { Base64 } from 'js-base64';
import vmodal from 'vue-js-modal'


// Font awesome
import 'font-awesome/css/font-awesome.css';

Parse.initialize ("Ox33tQSpiscXrVvf4HKXsduw2ProZNCysXXGY5zT");
Parse.serverURL = 'https://parse.protype.tw/parse';

Vue.config.productionTip = false;

Vue.prototype.$md5 = md5;
Vue.prototype.$j = jsrsasign;
Vue.prototype.$cookie = jsCookie;
Vue.prototype.$base64 = Base64;


Vue.use (VueMarkdown);
Vue.use (vmodal);
// Vue.use (datePicker);


new Vue ({
  router,
  store,
  render: h => h (App)
}).$mount ('#app')
