<script setup lang="ts">
import {ref} from "vue";
import {useAccountStore} from "@/stores/account";
import {onBeforeMount, onBeforeUnmount} from 'vue'
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const router = useRouter();
const {t, locale} = useI18n();

const accountStore = useAccountStore();
const eyeMnemonic = ref(true);
const dialog = ref(false);
const saveMnemonic = ref(false);

const rules = {
    save: (value: boolean) => value || t('rules.save'),
}

onBeforeMount(async () => {

    if (accountStore.backupMnemonic === "") {
        await router.push("/create");
    }
});

onBeforeUnmount(() => {

});

function copy(status:boolean) {
    if(status){
        dialog.value = true;
    }else{
        console.log('copy error');
    }
}

async function submit(event: any) {
    const results = await event;
    if (results.valid) {
        accountStore.backupMnemonic = '';
        await router.push("/");
    }
}

</script>

<template>
    <section class="select rounded-0 pt-10 pb-5 pa-lg-8">
        <v-img class="logo" :src="logoWhite"></v-img>
        <h1 class="text-center text-h5 font-weight-bold on-secondary-text text-capitalize">{{ $t('backup.title') }}</h1>
        <v-card class="mt-6 pa-5 pb-8 text-center">
            <v-card-title class="text-capitalize">
                {{ $t('recoveryPhrase') }}
            </v-card-title>
            <v-card-text>
                {{ $t('backup.dec', [$t('recoveryPhrase')]) }}
            </v-card-text>

            <div class="skeleton-box">
                <v-skeleton-loader v-if="eyeMnemonic" height="160" elevation="10" color="primary"
                                   type="article"></v-skeleton-loader>
                <div class="skeleton" v-else>
                    <v-chip v-for="name in accountStore.backupMnemonic.split(' ')" class="ma-1" color="primary"
                            variant="outlined" rounded="10">
                        {{ name }}
                    </v-chip>
                </div>
                <v-btn
                    size="x-small"
                    class="eye-mnemonic"
                    color="green"
                    :icon="eyeMnemonic ? 'mdi-eye' : 'mdi-eye-off'"
                    @click="eyeMnemonic = !eyeMnemonic"
                ></v-btn>
                <Copy :msg="accountStore.backupMnemonic" v-if="!eyeMnemonic" @copy="copy" class="backupMnemonicBtn">
                    <template #btn>
                        <v-btn
                            size="x-small"
                            color="secondary"
                            icon="mdi-content-copy"
                        ></v-btn>
                    </template>
                </Copy>
                <v-snackbar location="center" content-class="text-center" min-width="180px" v-model="dialog" timeout="3000"  variant="elevated" color="green">
                    {{ $t('copy') }}
                </v-snackbar>
<!--                <v-dialog v-model="dialog" width="auto" :scrim="false">
                    <v-card>
                        <div class="pa-3">
                            {{ $t('copy') }}
                        </div>
                    </v-card>
                </v-dialog>-->

            </div>

            <v-card-title class="text-capitalize font-weight-regular text-h6">
                {{ $t('warning') }}
            </v-card-title>
            <v-card-text>
                {{ $t('backup.warningDec', [$t('recoveryPhrase')]) }}
            </v-card-text>
            <v-form @submit.prevent="submit">
                <v-checkbox :rules="[rules.save]" class="save-checkbox-box mb-5 text-left" v-model="saveMnemonic"
                            :label="$t('backup.saveDec')"></v-checkbox>
                <v-btn class="mt-3 text-capitalize" type="submit" block size="large"
                       append-icon="mdi-lock-open-check-outline">
                    {{ $t('backup.btn') }}
                </v-btn>
            </v-form>

        </v-card>
    </section>
</template>
<style>
.save-checkbox-box.v-checkbox .v-selection-control {
    min-height: 40px;
    text-align: left;
}

.save-checkbox-box.v-checkbox .v-messages {
    padding-left: 40px;
}
</style>

<style scoped lang="scss">
.select {
    max-width: 460px;
    min-height: 50vh;
}

.skeleton {
    display: block;
    background: rgba(#000000, 0.1);
    border-radius: 10px;
    vertical-align: center;
    padding: 1rem 5px;
    min-height: 160px;
}

.logo {
    margin: 0 auto;
    width: 60px;

}

.skeleton-box {
    overflow: hidden;
    position: relative;
    margin: 2rem 0;
    min-height: 160px;
}

.eye-mnemonic {
    position: absolute;
    right: 6px;
    bottom: 6px;
    z-index: 90;
}

.backupMnemonicBtn {
    position: absolute;
    left: 6px;
    bottom: 6px;
    z-index: 91;
}

#backupMnemonic {
    position: absolute;
    left: -999px;
}

@media (max-width: 960px) {
    .select {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
}
</style>
