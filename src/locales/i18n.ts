import { createI18n } from 'vue-i18n'
import zhHans from './zhHans.json'
import en from './en.json'


const messages = {
    zhHans,
    en,
}

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

export {i18n};


