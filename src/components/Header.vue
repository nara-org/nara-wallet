<script setup lang="ts">
import {useClientStore} from "@/stores/client";
import {useApplyStore} from "@/stores/apply";

const clientStore = useClientStore();
const applyStore = useApplyStore();
</script>

<template>
    <v-app-bar density="comfortable" :elevation="2" absolute>
        <template v-slot:append>
            <v-btn>
                <v-badge :color="clientStore.isConnected ? 'secondary' : 'grey'" dot>
                    <v-icon type="text" :color="clientStore.isConnected ? 'secondary' : 'grey'" size="large">
                        {{ clientStore.isConnected ? 'mdi-access-point-network' : 'mdi-access-point-network-off' }}
                    </v-icon>
                </v-badge>
            </v-btn>
            <v-btn icon="mdi-menu" @click="applyStore.switchMenu"></v-btn>
        </template>
        <template v-slot:prepend>
            <v-img class="logo" :src="logoSecondary"></v-img>
        </template>
        <v-app-bar-title class="ml-1 text-capitalize">
            {{ $route.name === 'wallet' ? $t('app') : $t($route.name) }}
        </v-app-bar-title>
    </v-app-bar>
</template>

<style scoped lang="scss">
.logo {
    width: 36px;
}

</style>
