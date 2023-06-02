<script setup lang="ts">
import {ref, onMounted, onBeforeMount} from "vue";
import {useAccountStore} from "@/stores/account";

// import {onBeforeRouteUpdate} from "vue-router";

const accountStore = useAccountStore();
import {useClientStore} from "@/stores/client";
import Menu from "@/components/Menu.vue";

const clientStore = useClientStore();

onBeforeMount(async () => {
    await accountStore.initState();
    if (accountStore.address) {
        await clientStore.connect();
    }
})
//
// onBeforeRouteUpdate(async () => {
//     if (accountStore.address && !clientStore.isConnected) {
//         await clientStore.connect();
//     }
// })


</script>

<template>
    <v-layout class="main-box scroll-box">
        <RouterView name="Header"></RouterView>
        <RouterView/>
        <RouterView name="Nav"></RouterView>
        <Menu></Menu>
    </v-layout>

</template>

<style scoped lang="scss">

</style>
