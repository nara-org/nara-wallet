<script lang="ts" setup>
import {ref, watch} from "vue";
import {onMounted} from "vue";
import {useClientStore} from "@/stores/client";
import {useAccountStore} from "@/stores/account";
import {useWeb3Store} from "@/stores/web3";
import rules from "@/public/rules";
import {BigNumber} from '../public/walletCommon'

import ethereum from '../assets/images/ethereum.svg'
import polygon from '../assets/images/polygon.svg'
import usdc from '../assets/images/usdc.png'
import usdt from '../assets/images/usdt.png'
import nara from '@/assets/logo-secondary.png'

const clientStore = useClientStore();
const accountStore = useAccountStore();
const web3Store = useWeb3Store();

import {Core} from '@walletconnect/core'
import {Web3Wallet} from '@walletconnect/web3wallet'
import AuthClient from '@walletconnect/auth-client'
import SignClient from "@walletconnect/sign-client";
import BridgeSelect from "@/components/BridgeSelect.vue";
import BridgeConnect from "@/components/BridgeConnect.vue";

const dialog = ref(false);
const fromNetwork = ref({});
const toNetwork = ref({});
const fromCoin = ref({});
const fromNetworkActive = ref(false);

const fromNetworkList = ref([
    {
        title: 'Ethereum',
        value: 'ETH',
        id: 1,
        logo: ethereum,
    },{
        title: 'Polygon',
        value: 'MATIC',
        id: 137,
        logo: polygon,
    },
])


const toNetworkList = ref([
    {
        title: 'Nara Network',
        value: 'Nara',
        id: 1,
        logo: nara,
    }
])

const fromCoinList = ref([
    {
        title: 'USDT',
        value: 'USDT',
        logo: usdt,
    },{
        title: 'USDC',
        value: 'USDC',
        logo: usdc,
    },
]);
fromNetwork.value = fromNetworkList.value[1];
toNetwork.value = toNetworkList.value[0];
fromCoin.value = fromCoinList.value[0];
async function web3Init() {
    await web3Store.connect();
}

onMounted(async () => {
    await web3Store.initWeb3();
    // await web3Init();
})
</script>


<template>
    <v-main class="main-box scroll-box bridge-box">
        <v-container class="bridge">
            <section>
                <v-card class="pa-5 bridge-select" v-if="web3Store.address">
                    <v-card-title class="align-center d-flex text-h5">
                        <div class="mr-2">
                            <v-img width="38" height="38" :src="logoSecondary"></v-img>
                        </div>
                        Bridge tokens
                    </v-card-title>
                    <v-card-subtitle class="text-wrap">
                        Transfer your tokens from one network to another. If you experience any issues, check out the
                        FAQ or reach out to MetaMask Support.
                    </v-card-subtitle>
                    <v-row class="pa-5 mt-0" align="start">
                        <v-col class="bridge-col">
                            <section class="d-flex flex-wrap justify-start">
                                <div class="d-flex flex-1-1-100">
                                    <v-chip size="large" color="black" class="ma-2" rounded variant="outlined"
                                            link>
                                        <template v-slot:prepend>
                                            <v-icon color="secondary" class="mr-2">mdi-wifi</v-icon>
                                        </template>
                                        {{web3Store.chainName}}
                                    </v-chip>
                                </div>
                                <Copy :msg="web3Store.address" v-slot="{status}">
                                    <v-chip size="large" :color="status ? 'green' : 'black'" class="ma-2" rounded variant="outlined"
                                            link>
                                        <template v-slot:prepend>
                                            <img class="mr-2" width="24" height="24" src="../assets/images/metamask.svg" alt="">
                                        </template>
                                        {{ web3Store.address }}
                                    </v-chip>
                                </Copy>
                            </section>
                            <v-card-title>From this network</v-card-title>
                            <BridgeSelect v-model="fromNetwork" :list="fromNetworkList"></BridgeSelect>

                            <v-card-title class="mt-8">You send</v-card-title>
                            <div class="d-flex bg-white justify-center align-center elevation-2 rounded overflow-hidden">
                                <BridgeSelect :text="true" v-model="fromCoin" :list="fromCoinList"></BridgeSelect>
                                <v-divider inset vertical></v-divider>
                                <v-text-field
                                    flat
                                    type="number"
                                    variant="solo"
                                    label="Enter an amount"
                                    hide-details
                                    class="bridge-amount"
                                ></v-text-field>
                            </div>
                        </v-col>

                        <v-col class="bridge-col">
                            <section class="d-flex flex-wrap justify-end">
                                <div class="d-flex flex-1-1-100 justify-end">
                                    <v-chip size="large" color="black" class="ma-2" rounded variant="outlined"
                                            link>
                                        <template v-slot:prepend>
                                            <v-icon color="secondary" class="mr-2">mdi-wifi</v-icon>
                                        </template>
                                        Nara Network
                                    </v-chip>
                                </div>
                                <Copy :msg="accountStore.address" v-slot="{status}">
                                    <v-chip size="large" :color="status ? 'green' : 'black'" class="ma-2" rounded variant="outlined"
                                            link>
                                        <template v-slot:prepend>
                                            <img class="mr-3" width="24" height="24" src="../assets/logo-secondary.png" alt="">
                                        </template>
                                        {{ accountStore.address }}
                                    </v-chip>
                                </Copy>
                            </section>
                            <v-card-title>To this network</v-card-title>
                            <BridgeSelect v-model="toNetwork" :list="toNetworkList"></BridgeSelect>

                            <v-card-title class="mt-8">You receive</v-card-title>
                            <div class="d-flex bg-white justify-center align-center elevation-2 rounded overflow-hidden">
                                <BridgeSelect :text="true" v-model="fromCoin" :list="fromCoinList"></BridgeSelect>
                                <v-divider inset vertical></v-divider>
                                <v-text-field
                                    flat
                                    variant="solo"
                                    placeholder="Calculate..."
                                    hide-details
                                    readonly
                                    class="bridge-amount"
                                ></v-text-field>
                            </div>
                        </v-col>
                    </v-row>

                    <div class="align-center justify-center d-flex mt-8 mb-5 ">
                        <v-btn type="submit" width="50%" size="large"
                               append-icon="mdi-arrow-right">
                            Continue
                        </v-btn>
                    </div>

                </v-card>
                <BridgeConnect v-else></BridgeConnect>
            </section>
        </v-container>
    </v-main>
</template>
<style>
.bridge-amount{
    width: 30%;
    height: 100%;
}
.bridge-amount .v-input__control{
}
</style>
<style scoped lang="scss">
.bridge {
    max-width: 1280px;
    justify-content: center;
    align-items: center;
    align-content: center;
    display: flex;
    height: 100%;
    flex-wrap: wrap;
}
.bridge-select{
    background: rgba($background, 0.91);
}

.bridge-col {
    flex: 50%;
}

@media (max-width: 960px) {
    .bridge-col {
        flex: 100%;
    }
}
</style>
