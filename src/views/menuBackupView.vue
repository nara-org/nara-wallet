<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useAccountStore} from "@/stores/account";
import {onBeforeMount, onBeforeUnmount} from 'vue'
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
let props = defineProps(['types']);

const router = useRouter();
const {t, locale} = useI18n();

const accountStore = useAccountStore();
const eyeMnemonic = ref(true);
const dialog = ref(false);
const seed = ref('');

let langString = '';

onBeforeMount(async () => {
    if(props.types === 'mnemonic'){
        langString = 'recoveryPhrase';
    }else{
        langString = 'seed';
    }
});
onMounted(async () => {
    if(props.types === 'seed'){
        seed.value = await accountStore.addressSeed;
    }

})

onBeforeUnmount(() => {

});

function copy(status:boolean) {
    if(status){
        dialog.value = true;
    }else{
        console.log('copy error');
    }
}

async function submit() {

}

</script>

<template>
    <section class="select rounded-0 h-100">
        <v-card class="pa-5 pb-8 text-center h-100">
            <v-card-title class="text-capitalize">
                {{ $t(langString) }}
            </v-card-title>
            <v-card-text>
                {{ $t('backup.dec', [$t(langString)]) }}
            </v-card-text>

            <div class="skeleton-box">
                <v-skeleton-loader v-if="eyeMnemonic" height="160" elevation="10" color="primary"
                                   type="article"></v-skeleton-loader>
                <div class="skeleton" v-if="!eyeMnemonic && types === 'mnemonic'">
                    <v-chip v-for="name in accountStore.backupMnemonic.split(' ')" class="ma-1" color="primary"
                            variant="outlined" rounded="10">
                        {{ name }}
                    </v-chip>
                </div>
                <div class="skeleton" v-if="!eyeMnemonic && types === 'seed'">
                    <v-chip class="ma-2 mt-4" color="primary"
                            variant="outlined" rounded="10">
                        {{ seed }}
                    </v-chip>
                </div>
                <v-btn
                    size="x-small"
                    class="eye-mnemonic"
                    color="green"
                    :icon="eyeMnemonic ? 'mdi-eye' : 'mdi-eye-off'"
                    @click="eyeMnemonic = !eyeMnemonic"
                ></v-btn>
                <Copy :msg="types === 'mnemonic' ? accountStore.backupMnemonic : seed" v-if="!eyeMnemonic" @copy="copy" class="backupMnemonicBtn">
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
            </div>

            <v-card-title class="text-capitalize font-weight-regular text-h6">
                {{ $t('warning') }}
            </v-card-title>
            <v-card-text>
                {{ $t('backup.warningDec', [$t(langString)]) }}
            </v-card-text>
            <v-btn class="mt-3" @click="$router.go(-1)" type="submit" block size="large"
                   append-icon="mdi-arrow-u-left-top">
                {{ $t('back') }}
            </v-btn>
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
