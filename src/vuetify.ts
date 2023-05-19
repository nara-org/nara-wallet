import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify  } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as labsComponents from 'vuetify/labs/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

import { useI18n } from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import {i18n} from './locales/i18n'



const myCustomLightTheme = {
    dark: false,
    colors: {
        background: "#fdfbff",
        surface: "#fdfbff",
        primary: "#6c35e2",
        secondary: "#803eb1"
    },
}

const vuetify = createVuetify({
    components:{
        ...components,
        ...labsComponents
    },
    directives,
    blueprint: md3,
    locale: {
        adapter: createVueI18nAdapter({ i18n, useI18n }),
    },
    theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
            myCustomLightTheme,
        },
    },
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
})


export {vuetify};






