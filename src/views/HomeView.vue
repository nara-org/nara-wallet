<script setup lang="ts">
import {onMounted} from "vue";
import {useClientStore} from "@/stores/client";
import {useAccountStore} from "@/stores/account";
import {useRouter} from "vue-router";

const router = useRouter();
const clientStore = useClientStore();
const accountStore = useAccountStore();

onMounted(async () => {

})

async function clickCoin(item) {
    await router.push("/send");
}


</script>

<template>

    <v-main class="main-box scroll-box">
        <v-container class="">
            <div class="text-center mb-3">

                <Copy :msg="accountStore.address"  v-slot="{status}">
                    <v-chip size="small" :color="status ? 'green' : 'white'" class="ma-2" rounded variant="outlined" link>
                        {{ accountStore.address }}
                        <v-icon end size="" :icon="status ? 'mdi-check-circle-outline' : 'mdi-content-copy'"></v-icon>
                    </v-chip>
                </Copy>

            </div>
            <v-card class="btn-box">
                <v-card-text>

                    <div class="text-center pb-5 d-flex justify-center align-center">
                        <Transition name="slide-fade">
                            <div v-if="clientStore.isConnected && clientStore.balancesStatus">
                                <span class="text-h4 mr-2 text-secondary">{{ clientStore.currency.value }}</span>
                                <span class="text-grey">{{ clientStore.currency.currency }}</span>
                            </div>
                        </Transition>
                        <v-skeleton-loader v-if="!(clientStore.isConnected && clientStore.balancesStatus)"
                                           class="text-center" height="40px" width="90px" :elevation="4"
                                           color="secondary" type="text"></v-skeleton-loader>
                    </div>
                    <v-row align="center">
                        <v-col cols="4">
                            <v-btn width="100%" min-width="auto" size="large" prepend-icon="mdi-shopping" stacked
                                   variant="text">
                                Buy
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn to="/send" width="100%" min-width="auto" size="large" prepend-icon="mdi-send" stacked
                                   variant="text">
                                Send
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn width="100%" min-width="auto" size="large" prepend-icon="mdi-bridge" stacked
                                   variant="text">
                                Bridge
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <div class="trust-lines-box" @click="$router.push('/trust')">
                <div class="trust-lines d-flex">
                    <v-icon icon="mdi-plus-circle-multiple-outline" class="mr-2"></v-icon>
                    <h4 class="text-h6">{{ $t('trustSet') }}</h4>
                    <v-spacer></v-spacer>
                    <v-icon icon="mdi-arrow-u-right-top" class="mr-2"></v-icon>
                </div>
            </div>

            <CoinList class="pa-0 mt-5" @coin="clickCoin"></CoinList>
        </v-container>
    </v-main>

</template>

<style scoped lang="scss">


.trust-lines-box {
    margin-top: 20px;
}

.trust-lines {
    display: flex;
    background: rgba($background, 0.9);
    padding: 12px 20px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: $secondary;
    cursor: pointer;
}

.btn-box {
    background: rgba($background, 0.92);
}

.bg-primary-opacity {
    //background: rgba($secondary, 0.9);
    //color: $background;
    color: $secondary;
    //border: solid 1px $secondary;
}

.bg-primary-opacity:hover {
    cursor: pointer;
}

</style>