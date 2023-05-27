<script lang="ts" setup>
import {ref, watch} from "vue";
import {onMounted} from "vue";
import {useClientStore} from "@/stores/client";
import {useAccountStore} from "@/stores/account";
import rules from "@/public/rules";
import {BigNumber} from '../public/walletCommon'

const clientStore = useClientStore();

const accountStore = useAccountStore();

const dialog = ref(false);

const toAddress = ref("");
const amount = ref('');


watch(amount, () => {
    if(BigNumber(amount.value).gt(clientStore.currencySend.value)){
        if(BigNumber(clientStore.currencySend.value).gt(clientStore.fee)){
            amount.value = BigNumber(clientStore.currencySend.value).minus(clientStore.fee).toString();
        }else{
            amount.value = '';
        }
    }
})

function close(item: object) {
    dialog.value = false;
    console.log('close', item);
}


onMounted(async () => {
    await clientStore.connect();
    // console.log(clientStore.validAddress('rJYXku2TT3Bi3zT1Ce21n6zNmTgws84BAx'));
})

function show() {
    dialog.value = !dialog.value;
    console.log('show', dialog.value);
}

async function copyAddress() {
    toAddress.value = await navigator.clipboard.readText();
}


const submitStatus = ref(false);

const submitConfirm = ref(false);

function clearValue() {
    submitConfirm.value = false;
    submitStatus.value = false;
    amount.value = '';
    toAddress.value = '';
}

async function submit(event: any) {
    const results = await event;

    if (results.valid) {
        if(!submitConfirm.value) {
            submitConfirm.value = true;
            return;
        }
        submitStatus.value = true;
        let transaction = <any>{
            Destination: toAddress.value,
            Amount: amount.value,
        }
        if(clientStore.currencySend.issuer){
            transaction.Amount = {
                issuer: clientStore.currencySend.issuer,
                currency: clientStore.currencySend.currency,
                value: amount.value,
            }
        }
        await clientStore.payment(transaction);
        submitStatus.value = false;
        clearValue();
    }
}

</script>


<template>
    <v-main class="main-box scroll-box send-wrap">
        <v-form @submit.prevent="submit">
            <ul class="send-box">
                <li>
                    <h6 class="select-icon-title text-subtitle-2">{{ $t('selectCoin') }}</h6>
                    <div class="select-coin" @click="show">
                        <i>{{ clientStore.currencySend.currency.charAt(0) }}</i>
                        <div class="coin-name">
                            <p class="text-body-1">{{ clientStore.currencySend.currency }}</p>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="coin-banner">
                            <span class="text-h6">{{
                                    clientStore.currencySend.value
                                }}</span><small>{{ clientStore.currencySend.currency }}</small>
                        </div>
                    </div>
                </li>

                <li v-if="clientStore.currencySend.issuer">
                    <h6 class="select-icon-title text-subtitle-2">{{ $t("send.issuer") }}</h6>
                    <div class="select-coin">
                        <p class="text-caption text-grey">{{ clientStore.currencySend.issuer }}</p>
                    </div>
                </li>

                <li v-if="submitConfirm">
                    <h6 class="select-icon-title text-subtitle-2 text-capitalize">from this address</h6>
                    <v-text-field density="compact" v-model="accountStore.address" :disabled="submitConfirm" color="secondary" label="" variant="solo">
                    </v-text-field>
                </li>

                <li>
                    <h6 class="select-icon-title text-subtitle-2">Amount To Send</h6>
                    <v-text-field :density="submitConfirm ? 'compact' : 'default'" :disabled="submitConfirm" :rules="[rules.amount]" v-model="amount" type="number" color="secondary"
                                  label="Amount" variant="solo" :suffix="clientStore.currencySend.currency">
                        <template v-slot:message>
                            <p v-if="typeof rules.amount(amount) === 'string'" class="amount-error">
                                {{ rules.amount(amount) }}</p>
                        </template>
                    </v-text-field>
                </li>

                <li>
                    <h6 class="select-icon-title text-subtitle-2">Recipient's Address</h6>
                    <v-text-field :density="submitConfirm ? 'compact' : 'default'"  :disabled="submitConfirm" :rules="[rules.validAddress]" v-model="toAddress" @click:append-inner="copyAddress"
                                  color="secondary" :append-inner-icon="submitConfirm ? '' : 'mdi-content-copy'" label="Recipient's Address"
                                  variant="solo">
                        <template v-slot:message>
                            <p v-if="typeof rules.validAddress(toAddress) === 'string'" class="amount-error">
                                {{ rules.validAddress(toAddress) }}</p>
                        </template>
                    </v-text-field>
                </li>

                <li>
                    <h6 class="select-icon-title justify-center align-center text-subtitle-2 d-flex">
                        <span class="text-grey">Estimated Gas Fees</span>
                        <v-spacer></v-spacer>
                        <span class="text-body-1">{{clientStore.fee}} <small>{{ $t('name') }}</small></span>
                    </h6>
                </li>
                <li>
                    <v-btn :loading="submitStatus" class="mt-3" type="submit" block size="x-large" :append-icon="submitConfirm ? 'mdi-hand-okay' : 'mdi-send-clock-outline'">
                        {{submitConfirm ? $t('confirm') : $t('send.btn')}}
                    </v-btn>
                </li>
            </ul>
        </v-form>
        <CoinListDialog :status="dialog" @change="close"></CoinListDialog>
    </v-main>
</template>

<style scoped lang="scss">

.amount-error {
    color: rgba(white, 0.8);
    padding-bottom: 8px;
}

.send-box {
    padding: 20px;
}

.send-box {
    display: block;

    li {
    }
}

.select-icon-title {
    padding: 5px 0;
    color: #fff;
}

.select-coin {
    background: $background;
    width: 100%;
    display: flex;
    place-items: center;
    cursor: pointer;
    padding: 0 20px;
    height: 56px;
    margin-bottom: 20px;
    border-radius: 5px;

    i {
        $iSize: 30px;
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
</style>
