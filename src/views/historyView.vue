<script setup lang="ts">
import {onMounted, onBeforeUnmount, onBeforeMount} from "vue";
import {useClientStore} from "@/stores/client";
import {useAccountStore} from "@/stores/account";
import type {AccountTransaction} from '../public/typeCommon';
import {useRouter} from "vue-router";

const router = useRouter();
const clientStore = useClientStore()
const accountStore = useAccountStore()

onBeforeMount(async () => {
    clientStore.historyData = [];
})

onMounted(async () => {

})

onBeforeUnmount(async () => {

})

async function toDetails(hash:string){
    console.log(hash);
    await router.push('/details/' + hash);
}

async function loadData({done}) {
    console.log('loadData');
    if(clientStore.isConnected){
        let statusText = await clientStore.getHistory();
        done(statusText);
    }else{
        await clientStore.connect();
        clientStore.client.once('connected', async () => {
            let statusText = await clientStore.getHistory();
            done(statusText);
        })
    }
}

</script>

<template>
    <v-main class="main-box scroll-box history-wrap">
        <div class="history-box">
            <v-infinite-scroll :onLoad="loadData" :item="clientStore.historyData" color="white">
                <template v-for="(item, index) in clientStore.historyData" :key="item.tx.hash">
                    <div class="history-item" v-if="item.meta.TransactionResult === 'tesSUCCESS' && item?.tx.TransactionType == 'Payment'" @click="toDetails(item.tx.hash)">

                        <v-icon color="success mr-3"
                                :icon="accountStore.address === item.tx.Account ? 'mdi-arrow-u-up-right' : 'mdi-arrow-u-down-right'"
                                size="large"></v-icon>
                        <div class="history-text">
                            <h6>
                                <small class="pr-3">{{ item.tx?.TransactionType }}</small>
                                <v-spacer></v-spacer>
                                <span class="text-h6 text-right text-primary">
                                    {{accountStore.address === item.tx.Account ? '-' : '+'}}
                                    {{ dropsToXrp(item.meta.delivered_amount)}}
                                    <small class="text-body-2">{{$t('name')}}</small>
                                </span>
                            </h6>
                            <p>{{unixTimeFormat(item.tx.date)}}</p>
                        </div>
                    </div>
                </template>
                <template v-slot:empty>
                    <v-alert  border="start" elevation="2"  border-color="success">{{$t('history.empty')}}</v-alert>
                </template>
            </v-infinite-scroll>
        </div>
    </v-main>
</template>

<style scoped lang="scss">
.history-box {
    padding: 20px;

    .history-item {
        display: flex;
        background: rgba($background, 0.95);
        border-radius: 5px;
        padding: 10px;
        place-items: center;
        cursor: pointer;
        margin-bottom: 20px;

        .history-text {
            flex: auto;

            h6 {
                display: flex;
                place-items: center;
                width: 100%;
                padding-right: 10px;
            }
        }
    }
}
</style>