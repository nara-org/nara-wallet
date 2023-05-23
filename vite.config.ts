import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'

import crx from 'vite-plugin-crx-mv3'
import wasm from 'vite-plugin-wasm';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'

// https://vitejs.dev/config/

export default defineConfig((mode) => {
    console.log(mode);
    // const env = loadEnv(mode, process.cwd(), "");
    return {
        // define: {
        //     "process.env": env,
        // },
        build: {
            commonjsOptions: {
                include: [],
            },
            target: 'esnext',
            rollupOptions: {
                plugins: [
                    rollupNodePolyFill(),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        optimizeDeps: {
            disabled: false,
            esbuildOptions: {
                define: {
                    global: 'globalThis'
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        buffer: true,
                        process: true,
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
        },
        plugins: [
            vue(),
            vueJsx(),
            crx({
                manifest: './src/manifest.json'
            }),
            wasm(),
            VueI18nPlugin({
                // runtimeOnly: false,
                include: [path.resolve(__dirname, './src/locales/*.json')],
            }),
            // legacy ( {
            //     renderLegacyChunks: true,
            //     polyfills: ['es.global-this'],
            // } ),
            // inject({ Buffer: 'buffer' })
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
    }
})
