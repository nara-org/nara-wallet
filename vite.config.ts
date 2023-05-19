import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import crx from 'vite-plugin-crx-mv3'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx(),
        crx({
            manifest: './src/manifest.json'
        }),
        VueI18nPlugin({

        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/assets/css/settings.scss";`,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
