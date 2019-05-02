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
      path: '/:orgId', component: () => import ('./views/organization.vue'),
    },
    {
      path: '/:orgId/:proId', component: () => import ('./views/project.vue'),
    },
    {
      path: '/issue/:id',
      component: () => import ('./views/issue.vue'),
    },
    {
      path: '/issue/:id',
      component: () => import ('./views/issue.vue'),
    },
  ]
});
