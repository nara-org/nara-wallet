import {createApp} from 'vue'
import {createPinia} from 'pinia'
import { ComponentCustomProperties } from "@vue/runtime-core";

import App from './App.vue'
import router from './router'
import {i18n} from './locales/i18n'
import {vuetify} from './vuetify'

import './assets/css/main.scss'

import {xrpToDrops, dropsToXrp, isValidAddress, BigNumber} from './public/walletCommon'


declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string) => string,
        $translate: (key: string) => string,
        unixTimeFormat: (key: number) => string,
        logoSecondary: string,
        logoWhite: string,
        xrpToDrops: (key: string) => string,
        dropsToXrp: (key: string) => string,
    }
}

import logoSecondary from './assets/logo-secondary.png';
import logoWhite from './assets/logo-white.png';
import Copy from "@/components/Copy.vue";
import CoinList from "@/components/CoinList.vue";
import CoinListDialog from "@/components/CoinListDialog.vue";


const app = createApp(App)

app.component('Copy', Copy)
app.component('CoinList', CoinList)
app.component('CoinListDialog', CoinListDialog)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
app.use(i18n)
app.config.globalProperties.logoSecondary = logoSecondary;
app.config.globalProperties.logoWhite = logoWhite;
app.config.globalProperties.xrpToDrops = xrpToDrops;
app.config.globalProperties.dropsToXrp = dropsToXrp;
app.config.globalProperties.unixTimeFormat = function (time:number){
    let unix = 946684800;
    return (new Date((unix + time) * 1000)).toLocaleString();

};





