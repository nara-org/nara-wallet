import { createI18n } from 'vue-i18n'
// import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js';
// import zhHans from './zhHans.json'
// import en from './en.json'

import messages from '@intlify/unplugin-vue-i18n/messages'

// const messages = {
//     zhHans,
//     en,
// }

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages
})

export {i18n};


