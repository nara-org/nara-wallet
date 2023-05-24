<script setup lang="ts">
import {RouterView} from 'vue-router'
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
