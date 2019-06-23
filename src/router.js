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
      path: '/issues', name: 'my-issue', component: () => import('./views/my-issue.vue'),
    },
    {
      path: '/project/create', name: 'add-project', component: () => import('./views/add-project.vue'),
    },
    {
      path: '/org/create', name: 'add-organization', component: () => import('./views/add-organization.vue'),
    },
    {
      path: '/:orgName', name: 'organization', component: () => import ('./views/organization.vue'),
    },
    {
      path: '/:orgName/:proName', name: 'project', component: () => import ('./views/project.vue'),
    },
    {
      path: '/:orgName/:proName/issues/new', name: 'add-issue', component: () => import ('./views/add-issue.vue'),
    },
    {
      path: '/:orgName/:proName/:issueId', name: 'issue', component: () => import ('./views/issue.vue'),
    },
    {
      path: '/:orgName/:proName/milestone', name: 'milestone', component: () => import('./views/milestone.vue'),
    },
    {
      path: '/:orgName/:proName/milestone/:mileId', name: 'milestone-detail', component: () => import('./views/milestone-detail.vue'),
    },
    {
      path: '/:orgName/:proName/milestone/new', name: 'new-milestone', component: () => import('./views/new-milestone.vue'),
    },
    {
      path: '/:orgName/:proName/milestone/:mileId/edit', name: 'edit-milestone', component: () => import('./views/edit-milestone.vue'),
    },
    {
      path: '/:orgName/:proName/label-list', name: 'label-list', component: () => import('./views/label.vue'),
    },
  ]
});
