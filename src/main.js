import Vue from 'vue'
import app from './app.vue'
import router from './router'
import store from './store'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
