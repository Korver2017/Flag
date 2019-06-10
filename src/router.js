import Vue from 'vue'
import Router from 'vue-router'
import Home from "./app.vue";

Vue.use (Router)

export default new Router ({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/signin', name: 'signin', component: () => import('./views/signin.vue'),
    },
    {
      path: '/dashboard', name: 'dashboard', component: () => import('./views/dashboard.vue'),
    },
    {
      path: '/org/create', name: 'add-organization', component: () => import('./views/add-organization.vue'),
    },
    {
      path: '/:orgId', name: 'organization', component: () => import ('./views/organization.vue'),
    },
    {
      path: '/:orgId/:proId', name: 'project', component: () => import ('./views/project.vue'),
    },
    {
      path: '/:orgId/:proId/issues/new', name: 'add-issue', component: () => import ('./views/add-issue.vue'),
    },
    {
      path: '/:orgId/:proId/:issueId', name: 'issue', component: () => import ('./views/issue.vue'),
    },
    {
      path: '/:orgId/:proId/milestone', name: 'milestone', component: () => import('./views/milestone.vue'),
    },
    {
      path: '/:orgId/:proId/milestone/:mileId', name: 'milestone-detail', component: () => import('./views/milestone-detail.vue'),
    },
    {
      path: '/:orgId/:proId/milestone/new', name: 'new-milestone', component: () => import('./views/new-milestone.vue'),
    },
    {
      path: '/:orgId/:proId/milestone/:mileId/edit', name: 'edit-milestone', component: () => import('./views/edit-milestone.vue'),
    },
    {
      path: '/:orgId/:proId/label-list', name: 'label-list', component: () => import('./views/label.vue'),
    },
  ]
});
