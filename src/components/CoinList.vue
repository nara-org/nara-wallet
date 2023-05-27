<script setup lang="ts">
import {onMounted} from "vue";
import {useClientStore} from "@/stores/client";

const clientStore = useClientStore();


onMounted(async () => {
    await clientStore.getBalances();
    // console.log(clientStore.balances[0]);
})
const emit = defineEmits(['coin'])

function clickItem(item) {
    if(item.currency){
        clientStore.currencySend = item;
        emit("coin", item);
    }else{
        emit("coin", {});
    }
}

</script>

<template>

    <div class="coin-list">
        <h6 class="coin-list-title text-subtitle-2">
            <v-icon class="mr-1">mdi-format-list-bulleted</v-icon>
            Coin List
        </h6>
        <v-alert v-if="clientStore.isConnected && clientStore.balancesStatus && clientStore.balances.length <= 0" color="white"
                 border="start"
                 border-color="deep-purple accent-4"
                 elevation="2"
                 variant="tonal">
            <template #title>
                <h6 class="text-body-1 justify-center align-center d-flex">
                    <v-icon class="mr-2">mdi-alert-circle</v-icon>
                    {{$t('activated.title')}}
                </h6>
            </template>
            <template #text>
                <p class="mt-3">{{$t('activated.text1', [clientStore.reserve_base])}}</p>
                <p class="mt-3">{{$t('activated.text2')}}</p>
            </template>
        </v-alert>
        <div class="text-center pa-5" v-if="!clientStore.isConnected || !clientStore.balancesStatus">
            <v-progress-circular :size="38" :width="3" color="white" indeterminate></v-progress-circular>
        </div>
        <Transition name="slide-fade">
            <ul v-if="clientStore.isConnected && clientStore.balancesStatus">
                <li v-for="(item, index) in clientStore.balances" @click="clickItem(item)">
                    <i>{{item.currency.charAt(0)}}</i>
                    <div class="coin-name">
                        <p class="text-body-1">{{ item.currency }}</p>
                        <small v-if="item.issuer">{{ item.issuer }}</small>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="coin-banner">
                        <span class="text-h6">{{ item.value }}</span><small>{{ item.currency }}</small>
                    </div>
                </li>
            </ul>
        </Transition>

    </div>
</template>

<style scoped lang="scss">
.coin-list-wrap {
    background: linear-gradient($primary, $secondary);
}

.coin-list {
    padding: 20px;

    .coin-list-title {
        padding: 10px 0;
        color: #fff;
    }

    ul {
        display: block;

        li {
            background: rgba($background, 0.9);
            width: 100%;
            display: flex;
            place-items: center;
            cursor: pointer;
            padding: 12px 20px;
            margin-bottom: 8px;
            border-radius: 8px;

            i {
                $iSize: 36px;
                width: $iSize;
                height: $iSize;
                background: $secondary;
                color: $background;
                font-size: 18px;
                text-align: center;
                border-radius: 20px;
                font-style: normal;
                line-height: $iSize;
            }

            .coin-name {
                margin-left: 10px;

                p {
                    line-height: 1;
                }

                small {
                    padding-left: 1px;
                }
            }

            .coin-banner {
                span {
                    color: $primary;
                }
            }
        }
    }
}
</style>
