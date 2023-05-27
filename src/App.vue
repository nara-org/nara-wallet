<script setup lang="ts">
import {onMounted, onBeforeMount} from "vue";
import {useAccountStore} from "@/stores/account";
const accountStore = useAccountStore();
import {useClientStore} from "@/stores/client";

const clientStore = useClientStore();

onBeforeMount(async() => {
    await accountStore.initState();
    await clientStore.connect();
})

</script>

<template>
    <v-layout class="main-box scroll-box">
        <RouterView name="Header"></RouterView>
        <RouterView />
        <RouterView name="Nav"></RouterView>
    </v-layout>

</template>

<style scoped>
</style>
