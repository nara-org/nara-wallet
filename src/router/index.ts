import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import welcomeView from '../views/welcomeView.vue'
import selectView from '../views/selectView.vue'
import importView from '../views/importView.vue'
import createView from '../views/createView.vue'
import backupView from '../views/backupView.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory (),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView
      component: backupView
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: welcomeView
    },
    {
      path: '/select',
      name: 'select',
      component: selectView
    },
    {
      path: '/import',
      name: 'import',
      component: importView
    },
    {
      path: '/create',
      name: 'create',
      component: createView
    },
    {
      path: '/backup',
      name: 'backup',
      component: backupView
    }
  ]
})

export default router
