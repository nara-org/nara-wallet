<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import {useWeb3Store} from "@/stores/web3";

const web3Store = useWeb3Store();
const props = defineProps<{}>()
const dialog = ref(false);

import type {Web3StatusType} from "@/public/typeCommon";
const statusType = ref(<Web3StatusType>'init');

async function web3Init() {
    statusType.value = 'wait';
    statusType.value = await web3Store.connect();
}

onMounted(async () => {
    await web3Store.initWeb3();
    if(web3Store.address){
        await web3Store.connect();
    }
    console.log(web3Store.address);
})

</script>

<template>
    <v-card class="text-center pa-5">
        <v-card-actions>
            <v-img height="80" :src="logoSecondary"></v-img>
        </v-card-actions>
        <v-card-title>Connect your wallet</v-card-title>
        <v-card-text class="mt-5 mb-5">
            Connect more than one account to experience the full potential of this dapp! 💡
        </v-card-text>
        <v-btn class="w-75" size="x-large" @click="dialog = true">Connect Wallet</v-btn>
    </v-card>

    <v-dialog transition="dialog-bottom-transition" width="auto" v-model="dialog">
        <template v-slot:default="{ isActive }">
            <v-card>
                <v-toolbar density="comfortable" color="secondary" title="Connect Wallet Types">
                    <v-btn icon color="white" @click="isActive.value = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-btn @click="web3Init" class="ma-5" stacked height="140" width="160" color="transparent">
                        <template #prepend>
                            <img height="60" src="../assets/images/metamask.svg" alt="">
                        </template>
                        <p class="text-body-1">Metamask</p>
                    </v-btn>
                    <v-btn class="ma-5" stacked height="140" width="160" color="transparent">
                        <template #prepend>
                            <img height="60" src="../assets/images/walletconnect.png" alt="">
                        </template>
                        <p class="text-body-1">Wallet Connect</p>
                    </v-btn>
                    <section style="height: 10px;">
                        <v-progress-linear
                            v-if="statusType == 'wait'"
                            color="deep-purple-accent-4"
                            indeterminate
                            rounded
                            height="6"
                        ></v-progress-linear>
                    </section>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>
</template>


<style scoped>

</style>
