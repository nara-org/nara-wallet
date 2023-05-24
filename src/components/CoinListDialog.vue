<script setup lang="ts">

import {ref, watch} from "vue";

const props = defineProps(['status'])
const emit = defineEmits(['change'])

const dialog = ref(false);

dialog.value = props.status;

watch(props, () => {
    dialog.value = props.status;
});

function clickCoin(item: object) {
    emit('change', item);
}

</script>

<template>
    <v-dialog class="coin-list-wrap" v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
        <v-toolbar dark>
            <v-btn icon dark @click="clickCoin">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Select Coins</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn variant="text" @click="clickCoin">
                    Save
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <CoinList @coin="clickCoin"></CoinList>
    </v-dialog>
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
