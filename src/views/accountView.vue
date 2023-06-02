<script setup lang="ts">
import {useAccountStore} from "@/stores/account";
import {ref} from "vue";

const accountStore = useAccountStore();
const dialog = ref(false);
const dialogName = ref('');
const modifyName = ref('');
const accountIndex = ref(0);

function modifyBtn(item, index){
    dialog.value = true;
    modifyName.value = '';
    dialogName.value = item.name ? item.name : 'Wallet' + (index + 1);
    accountIndex.value = index;
}


async function modifySave(){
    if(modifyName.value.trim().length <= 0 ) return;
    await accountStore.modifyName(modifyName.value, accountIndex.value);
    dialog.value = false;
}

async function clickAddress(address:string){
    await accountStore.setAddress(address);
}

</script>

<template>

    <v-main class="main-box scroll-box">
        <ul class="account-box">
            <li :class="item.address === accountStore.address ? 'selected' : ''" v-for="(item, index) in accountStore.accounts[accountStore.walletType].address" @click="clickAddress(item.address)">
                <v-avatar color="secondary" size="small" class="mr-3">
                    <v-icon size="small" color="white">mdi-wallet-outline</v-icon>
                </v-avatar>
                <div class="account-name">
                    <v-list-item-title>
                        {{ item.name ? item.name : 'Wallet' + (index + 1) }}
                    </v-list-item-title>

                    <Copy :msg="item.address" v-slot="{status}">
                        <v-list-item-subtitle class="justify-center align-center d-flex">

                            <span class="mr-3">{{addressShort(item.address || '', 8) }}</span>

                            <v-btn density="compact" size="small" :color="status ? 'green' : 'primary'"
                                   variant="text"
                                   :icon="status ? 'mdi-check-circle-outline' : 'mdi-content-copy'"></v-btn>
                        </v-list-item-subtitle>
                    </Copy>
                </div>
                <v-btn
                    size="small"
                    color="indigo"
                    icon="mdi-book-edit-outline"
                    @click.stop="modifyBtn(item, index)"
                >
                </v-btn>
            </li>
        </ul>

        <v-dialog
            v-model="dialog"
            persistent
            width="auto"
        >
            <v-card min-width="300" class="pa-3" elevation="10">
                <v-list-item-title class="mb-3">{{dialogName}} {{$t('modifyName')}}</v-list-item-title>
                <v-text-field
                    bg-color="secondary"
                    variant="solo"
                    :label="$t('modifyName')"
                    hide-details
                    v-model="modifyName"
                ></v-text-field>
                <v-card-actions class="mt-2">
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" variant="outlined" @click="dialog = false">
                        {{ $t('cancel') }}
                    </v-btn>
                    <v-btn variant="outlined" @click="modifySave">
                        {{ $t('confirm') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-main>

</template>

<style scoped lang="scss">
.account-box {
    display: block;
    padding: 20px;

    li {
        display: flex;
        background: rgba($background, 0.8);
        border-radius: 5px;
        margin-bottom: 20px;
        place-items: center;
        padding: 12px 16px;
        cursor: pointer;
        &.selected{
            background: $background;
        }
        .account-name {
            place-items: center;
            justify-content: center;
            align-items: center;
            flex: auto;
            line-height: 1;
        }
    }
}
</style>