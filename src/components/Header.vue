<script setup lang="ts">
import {useClientStore} from "@/stores/client";
import {useApplyStore} from "@/stores/apply";
import {useRouter, useRoute} from "vue-router";
import {ref, computed} from "vue";

const clientStore = useClientStore();
const applyStore = useApplyStore();
const router = useRouter();
const route = useRoute();

// const backStatus = ref(false);


const backStatus = computed(() => {
    if(route.name === 'wallet' || route.name === 'history' || route.name === 'ntfs'){
        return  false
    }else{
        return true;
    }
});

function back() {
    applyStore.menuStatus.value = false;
    router.go(-1);
}

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
            <v-img v-show="!backStatus" class="logo" :src="logoSecondary"></v-img>
            <v-btn density="comfortable" @click="back" v-show="backStatus" icon="mdi-arrow-left" ></v-btn>
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
