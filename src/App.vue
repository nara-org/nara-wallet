<script setup lang="ts">
import {ref, onMounted, onBeforeMount} from "vue";
import {useAccountStore} from "@/stores/account";

const accountStore = useAccountStore();
import {useClientStore} from "@/stores/client";
import Menu from "@/components/Menu.vue";

const clientStore = useClientStore();

onBeforeMount(async () => {
    await accountStore.initState();
    await clientStore.connect();
})
const open = ref(['Users']);
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
