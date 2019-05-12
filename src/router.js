import Vue from 'vue'
import Router from 'vue-router'
import Home from "./app.vue";

Vue.use (Router)

export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin', name: 'signin', component: () => import ('./views/signin.vue'),
    },
    {
      path: '/dashboard', name: 'dashboard', component: () => import('./views/dashboard.vue'),
    },
    {
      path: '/:orgId', name: 'organization', component: () => import ('./views/organization.vue'),
    },
    {
      path: '/:orgId/:proId', name: 'project', component: () => import ('./views/project.vue'),
    },
    {
      path: '/:orgId/:proId/:issueId', name: 'issue', component: () => import ('./views/issue.vue'),
    },
    {
      path: '/:orgId/:proId/milestone', name: 'milestone', component: () => import('./views/milestone.vue'),
    },
  ]
});
