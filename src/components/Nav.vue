<script setup lang="ts">
import {useRouter, useRoute} from "vue-router";
import {useApplyStore} from "@/stores/apply";

const route = useRoute();
const router = useRouter();
const applyStore = useApplyStore();
let nav = [
    {
        route: '/',
        icon: 'mdi-wallet-bifold',
        name: 'wallet',
    },{
        route: '/ntfs',
        icon: 'mdi-clipboard-text-clock',
        name: 'ntfs',
    },{
        route: '/history',
        icon: 'mdi-clipboard-text-clock',
        name: 'history',
    },
];

</script>

<template>
    <v-bottom-navigation :elevation="3" active grow color="secondary" absolute>
        <v-btn :key="item.name" v-for="item in nav" class="text-uppercase" :to="item.route">
            <v-icon>{{item.icon}}</v-icon>
            {{ $t(item.name) }}
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>

</style>
