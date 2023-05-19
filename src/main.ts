
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {i18n} from './locales/i18n'
import {vuetify} from './vuetify'

import './assets/css/main.scss'

const app = createApp(App)

import logoSecondary from './assets/logo-secondary.png';
import logoWhite from './assets/logo-white.png';

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.config.globalProperties.logoSecondary = logoSecondary;
app.config.globalProperties.logoWhite = logoWhite;

app.mount('#app')
