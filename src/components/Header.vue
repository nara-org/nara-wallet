<script setup lang="ts">

</script>

<template>
    <v-app-bar density="comfortable" :elevation="2" absolute>
        <template v-slot:append>
            <v-btn color="green" icon="mdi-access-point-network"></v-btn>
            <v-btn icon="mdi-menu"></v-btn>
        </template>
        <template v-slot:prepend>
            <v-img class="logo" :src="logoSecondary"></v-img>
        </template>
        <v-app-bar-title class="ml-1 text-capitalize">
            {{ $route.name === 'home' ? $t('app') : $t($route.name) }}
        </v-app-bar-title>
    </v-app-bar>

</template>

<style scoped>
.logo{
    width: 36px;
}
</style>
