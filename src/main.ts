import {createApp} from 'vue'
import {createPinia} from 'pinia'
// import { ComponentCustomProperties } from "@vue/runtime-core";

import App from './App.vue'
import router from './router'
import {i18n} from './locales/i18n'
import {vuetify} from './vuetify'

import './assets/css/main.scss'


// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $t: (key: string) => string,
//         $translate: (key: string) => string,
//         logoSecondary: string,
//         logoWhite: string,
//     }
// }


const app = createApp(App)

import logoSecondary from './assets/logo-secondary.png';
import logoWhite from './assets/logo-white.png';

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
app.use(i18n)
app.config.globalProperties.logoSecondary = logoSecondary;
app.config.globalProperties.logoWhite = logoWhite;





