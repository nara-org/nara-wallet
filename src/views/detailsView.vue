<script lang="ts" setup>
import {useAccountStore} from "@/stores/account";
import {useClientStore} from "@/stores/client";
import {onMounted, ref} from "vue";
import type {TxResult} from '../public/typeCommon';

let props = defineProps(['hash']);

const accountStore = useAccountStore();
const clientStore = useClientStore();


const txData = ref(<TxResult>{});

const txStatus = ref(false);

onMounted(async () => {
    if(props.hash.length != 64) return;
    txStatus.value = false;
    if (clientStore.isConnected) {
        txData.value = await clientStore.getTx(props.hash);
        txStatus.value = true;
    }
    clientStore.client.once('connected', async () => {
        txData.value = await clientStore.getTx(props.hash);
        txStatus.value = true;
    });
})

function toExplorer() {
    window.open('https://livenet.xrpl.org/transactions/' + txData.value.hash);
}

</script>


<template>
    <v-main class="main-box scroll-box details-wrap">
        <div class="text-center pa-5 mt-8" v-if="!txStatus">
            <v-progress-circular :size="38" :width="3" color="white" indeterminate></v-progress-circular>
        </div>
        <Transition name="slide-fade">
            <section v-if="txStatus">

                <div class="text-center mb-3 mt-3">
                    <v-chip prepend-icon="mdi-clipboard-text-clock-outline" size="small" color="white" class="ma-2"
                            rounded
                            variant="outlined">
                        {{ unixTimeFormat(txData.date) }}
                    </v-chip>
                </div>
                <div class="details-box">
                    <v-list>
                        <v-list-subheader class="">Balance Change</v-list-subheader>
                        <v-list-item>
                            <v-list-item-subtitle>Type</v-list-item-subtitle>

                            <v-list-item-title
                                :class="txData.meta?.TransactionResult === 'tesSUCCESS' ? 'text-green' : 'text-error'">
                                {{ $t((txData.TransactionType || '')) }}
                            </v-list-item-title>
                            <template v-slot:append>
                                <v-btn v-if="txData.meta?.TransactionResult === 'tesSUCCESS'" color="green" size="small"
                                       icon="mdi-check-circle-outline" variant="text"></v-btn>
                                <v-btn v-else color="error" size="small" icon="mdi-information-variant-circle-outline"
                                       variant="text"></v-btn>
                            </template>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-subtitle>{{ $t('Account') }}</v-list-item-subtitle>

                            <v-list-item-title class="text-body-2">
                                {{ txData.Account }}
                            </v-list-item-title>

                            <template v-slot:append v-if="accountStore.address != txData.Account">
                                <Copy :msg="txData.Account" v-slot="{status}">
                                    <v-btn size="small" :icon="status ? 'mdi-check-circle-outline' : 'mdi-content-copy'"
                                           variant="text"></v-btn>
                                </Copy>
                            </template>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-subtitle>{{ $t('Destination') }}</v-list-item-subtitle>

                            <v-list-item-title class="text-body-2">
                                {{ txData.Destination }}
                            </v-list-item-title>

                            <template v-slot:append v-if="accountStore.address != txData.Destination">
                                <Copy :msg="txData.Destination" v-slot="{status}">
                                    <v-btn size="small" :icon="status ? 'mdi-check-circle-outline' : 'mdi-content-copy'"
                                           variant="text"></v-btn>
                                </Copy>
                            </template>
                        </v-list-item>

                        <v-list-item class="mt-2">
                            <v-list-item-subtitle>{{ $t('delivered') }}</v-list-item-subtitle>

                            <v-list-item-title class="text-h6 text-right text-primary">
                                {{ accountStore.address === txData.Account ? '-' : '+' }}
                                {{ dropsToXrp((txData.meta?.delivered_amount || '0')) }}
                                <small class="text-body-2">
                                    {{ typeof txData.Amount === 'string' ? $t('name') : txData.Amount?.currency }}
                                </small>
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item class="mt-2" v-if="typeof txData.Amount === 'object'">
                            <v-list-item-subtitle>{{ $t('issuer') }}</v-list-item-subtitle>
                            <v-list-item-title  class="text-body-2">
                                {{ txData.Amount.issuer }}
                            </v-list-item-title>
                        </v-list-item>

                    </v-list>
                </div>

                <div class="details-box">
                    <v-list>
                        <v-list-subheader class="">{{ $t('ledger') + ' ' + $t('data') }}</v-list-subheader>
                        <v-list-item>
                            <v-list-item-subtitle>{{ $t('fee') }}</v-list-item-subtitle>

                            <v-list-item-title class="text-right">
                                {{ dropsToXrp((txData.Fee || '0')) }}
                                {{ $t('name') }}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-subtitle>{{ $t('ledger') }}</v-list-item-subtitle>
                            <v-list-item-title class="text-right">
                                {{ txData.ledger_index }}
                            </v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                            <v-list-item-subtitle>{{ $t('hash') }}</v-list-item-subtitle>

                            <p style="word-break: break-all;" class=text-caption>
                                {{ txData.hash }}
                            </p>
                            <template v-slot:append>
                                <Copy :msg="txData.hash" v-slot="{status}">
                                    <v-btn size="small" :icon="status ? 'mdi-check-circle-outline' : 'mdi-content-copy'"
                                           variant="text"></v-btn>
                                </Copy>
                            </template>
                        </v-list-item>
                    </v-list>
                </div>

                <div class="text-center pb-8">
                    <v-btn @click="toExplorer" class="mt-3" width="80%" variant="outlined" color="white"
                           append-icon="mdi-microsoft-internet-explorer">{{ $t('explorer') }}
                    </v-btn>
                </div>
            </section>
        </Transition>
    </v-main>
</template>

<style scoped lang="scss">
.details-box {
    display: block;
    margin: 0 20px 20px;
    background: rgba($background, 1);
    border-radius: 5px;
    overflow: hidden;
    padding: 8px 0;
}

.details-wrap {
}
</style>
