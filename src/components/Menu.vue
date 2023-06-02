<script setup lang="ts">
import {useRouter, useRoute} from "vue-router";
import {useAccountStore} from "@/stores/account";
import {ref} from "vue";
import {useApplyStore} from "@/stores/apply";
import rules from "@/public/rules";
import {useI18n} from "vue-i18n";

const {t, locale} = useI18n();
const rulesSave = (value: boolean) => value || t('rules.save');

const accountStore = useAccountStore();
const applyStore = useApplyStore();

const route = useRoute();
const router = useRouter();
const dialog = ref(false);
const password = ref('');
const validateStatus = ref(false);
const saveMnemonic = ref(false);

type MenuClickType = 'new' | 'mnemonic' | 'seed' | 'account' | 'del';
const menuType = ref(<MenuClickType>'del');

async function clickMenu(clickType: MenuClickType) {
    if (clickType === 'account') {
        await router.push('/account');
        applyStore.menuStatus = false;
        return;
    }
    menuType.value = clickType;
    dialog.value = true;
}

async function validatePassword() {
    validateStatus.value = true;
    try {
        const status = await accountStore.validateDecrypt(password.value);
        if (status) {
            let pathString = '';
            if (menuType.value === 'mnemonic') {
                // console.log(accountStore.backupMnemonic);
                await accountStore.decryptMnemonic;
                // console.log(accountStore.backupMnemonic);
                pathString = '/menuBackup/' + menuType.value;
            }
            if (menuType.value === 'seed') {
                pathString = '/menuBackup/' + menuType.value;
            }
            // addAddress
            if (menuType.value === 'new') {
                await accountStore.addAddress(password.value);
                pathString = '/account';
            }
            validateStatus.value = false;
            dialog.value = false;
            applyStore.menuStatus = false;
            password.value = '';
            await router.push(pathString);
        } else {
            password.value = '';
            validateStatus.value = false;
        }
        // console.log(status);
    } catch (e) {
        console.log(e);
        validateStatus.value = false;
        dialog.value = false;
        applyStore.menuStatus = false;
        password.value = '';
    }

}

async function delWallet(event){
    const results = await event;
    if (results.valid) {
        await accountStore.delWallet();
        validateStatus.value = false;
        dialog.value = false;
        applyStore.menuStatus = false;
        password.value = '';
        await router.push('/welcome');
    }
}

</script>

<template>
    <section class="menu-box bg-deep-purple" v-if="applyStore.menuStatus">
        <v-list density="compact" color="white" bg-color="transparent">
            <v-list-item
                lines="two"
                :title="accountStore.addressName"
                :subtitle="accountStore.address"
                :value="accountStore.address"
                @click="clickMenu('account')"
            >
                <template v-slot:prepend>
                    <v-avatar color="secondary" size="small">
                        <v-icon size="small" color="white">mdi-wallet-outline</v-icon>
                    </v-avatar>
                </template>
                <template #append>
                    <v-icon size="large" color="white">mdi-arrow-top-right</v-icon>
                </template>
            </v-list-item>
        </v-list>
        <v-list density="compact" color="primary" lines="two">
            <v-list-item @click="clickMenu('new')" prepend-icon="mdi-note-plus-outline" :title="$t('menu.new')"
                         :value="$t('menu.new')"></v-list-item>
            <v-list-item @click="clickMenu('mnemonic')" prepend-icon="mdi-file-word-outline"
                         :title="$t('menu.mnemonic')"
                         :value="$t('menu.mnemonic')"></v-list-item>
            <v-list-item @click="clickMenu('seed')" prepend-icon="mdi-seed-outline" :title="$t('menu.seed')"
                         :value="$t('menu.seed')"></v-list-item>
            <div class="pa-5">
                <v-btn  @click="clickMenu('del')" block size="large" color="secondary">
                    {{ $t('menu.del') }}
                </v-btn>
            </div>
        </v-list>

        <v-dialog
            v-model="dialog"
            persistent
            width="auto"
        >
            <v-card :color="menuType === 'del' ? 'white' : 'secondary'" min-width="320" class="pa-3 pl-5 pr-5 pt-5" elevation="10">
                <v-list-item-title class="mb-3 text-uppercase">{{ $t('menu.' + menuType) }}</v-list-item-title>
                <v-form @submit.prevent="delWallet">
                    <v-text-field
                        type="password"
                        bg-color="white"
                        variant="solo"
                        :label="$t('create.PW')"
                        hide-details
                        v-model="password"
                        :rules="[rules.password]"
                    ></v-text-field>

                    <v-checkbox v-if="menuType === 'del'" density="compact" :rules="[rulesSave]" color="warning" class="text-left mt-3"
                                v-model="saveMnemonic"
                                :label="$t('backup.saveDec')">
                    </v-checkbox>

                    <v-card-actions class="mt-0" v-if="menuType === 'del'">
                        <v-btn color="info" variant="outlined" @click="dialog = false">
                            {{ $t('cancel') }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" color="secondary" :loading="validateStatus"
                               variant="outlined">
                            {{ $t('confirm') }}
                        </v-btn>
                    </v-card-actions>
                </v-form>
                <v-card-actions class="mt-5" v-if="menuType !== 'del'">
                    <v-spacer></v-spacer>
                    <v-btn color="white" class="mr-5" variant="outlined" @click="dialog = false">
                        {{ $t('cancel') }}
                    </v-btn>
                    <v-btn color="white" :disabled="password.length <= 0" :loading="validateStatus" variant="outlined"
                           @click="validatePassword">
                        {{ $t('save') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </section>
</template>

<style scoped>
.menu-box {
    position: absolute;
    width: 100%;
    box-sizing: content-box;
    z-index: 999999;
    left: 0;
    top: 56px;
    bottom: 0px;
    overflow: hidden;
}
</style>
