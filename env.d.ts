/// <reference types="vite/client" />
declare module '*.vue' {

}

declare module 'vuetify';
declare module 'crypto-js';
declare module 'vuetify/*';
declare module 'vue-i18n';

interface ImportMetaEnv {
    VITE_PROJECT_ID: string;
    VITE_RELAY_URL: string;
}

