<script lang="ts" setup>
import {ref} from "vue";

const dialog = ref(false);

function close(item: object) {
    dialog.value = false;
    console.log('close', item);
}

function show() {
    dialog.value = !dialog.value;
    console.log('show', dialog.value);
}
</script>


<template>
    <v-main class="main-box scroll-box send-wrap">
        <ul class="send-box">
            <li>
                <h6 class="select-icon-title text-subtitle-2">Select Coins</h6>
                <div class="select-coin" @click="show">
                    <i>N</i>
                    <div class="coin-name">
                        <p class="text-body-1">Nara</p>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="coin-banner">
                        <span class="text-h6">14111111.91</span><small>Nara</small>
                    </div>
                </div>
            </li>

            <li>
                <h6 class="select-icon-title text-subtitle-2">Amount To Send</h6>
                <v-text-field color="secondary" label="Amount" variant="solo" suffix="Nara"></v-text-field>
            </li>

            <li>
                <h6 class="select-icon-title text-subtitle-2">Recipient's Address</h6>
                <v-text-field color="secondary" label="Recipient's Address" variant="solo"></v-text-field>
            </li>

            <li>
                <h6 class="select-icon-title justify-center align-center text-subtitle-2 d-flex">
                    <span>Estimated Gas Fees</span>
                    <v-spacer></v-spacer>
                    <span class="text-body-1">0.23 <small>Nara</small></span>
                </h6>
            </li>
            <li>
                <v-btn class="mt-3" block size="x-large" to="/select" append-icon="mdi-send-clock-outline">send</v-btn>
            </li>
        </ul>
        <CoinListDialog :status="dialog" @change="close"></CoinListDialog>
    </v-main>
</template>

<style scoped lang="scss">
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
