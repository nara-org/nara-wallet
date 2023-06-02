import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import welcomeView from '../views/welcomeView.vue'
import selectView from '../views/selectView.vue'
import importView from '../views/importView.vue'
import createView from '../views/createView.vue'
import backupView from '../views/backupView.vue'
import sendView from '../views/sendView.vue'
import detailsView from '../views/detailsView.vue'
import historyView from '../views/historyView.vue'
import trustView from '../views/trustView.vue'
import accountView from '../views/accountView.vue'
import menuBackupView from '../views/menuBackupView.vue'

import Header from '../components/Header.vue'
import Nav from '../components/Nav.vue'

const router = createRouter({
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: 'wallet',
            components: {
                default: HomeView,
                Nav,
                Header,

            }
        },
        {
            path: '/wallet',
            redirect: '/',
        },
        {
            path: "/account",
            name: 'account',
            components: {
                default: accountView,
                Header,
            }
        },
        {
            path: "/trust",
            name: 'trust',
            components: {
                default: trustView,
                Header,
            }
        },
        {
            path: "/menuBackup/:types",
            name: 'menuBackup',
            props: true,
            component: menuBackupView
        },
        {
            path: "/details/:hash",
            name: 'details',
            props: true,
            components: {
                default: detailsView,
                Header,
            }
        },
        {
            path: "/history",
            name: 'history',
            components: {
                default: historyView,
                Header,
                Nav,
            }
        },
        {
            path: '/send',
            name: 'send',
            components: {
                default: sendView,
                Header,
            }
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
