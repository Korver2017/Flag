import Vue from 'vue'
import Router from 'vue-router'
import Home from "./app.vue";
// import IssueList from "./views/issue-list.vue";

Vue.use (Router)

export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import ('./views/dashboard.vue')
    },
    {
      path: '/flag',
      name: 'issue-list',
      component: () => import ('./views/issue-list.vue'),
    },
    {
      path: '/flag/:id',
      name: 'issue',
      component: () => import ('./views/issue.vue'),
    },
  ]
});
