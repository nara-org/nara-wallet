<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useAccountStore} from "@/stores/account";
import {useRouter} from "vue-router";
import rules from "@/public/rules";

const router = useRouter();
const {t, locale} = useI18n();
const accountStore = useAccountStore();


const password = ref("");
const passwordStatus = ref(true);
const confirmStatus = ref(true);
const confirmPassword = ref("");
const sync = ref(false);
const terms = ref(false);

console.log(t('name'));

const confirmPW = (value: string) => value == password.value || t('rules.confirmPW');

async function submit(event: any) {
    const results = await event;
    if (results.valid) {
        await accountStore.initState();
        await accountStore.createAccount(password.value);
        await router.push("/backup");
    }
}

</script>

<template>
    <section class="create rounded-0 bg-white rounded-xl pa-8 pt-10 pb-10 ">
        <v-img class="logo" :src="logoSecondary"></v-img>
        <h1 class="primary-text text-capitalize text-center font-weight-bold">{{ $t('create.title') }}</h1>
        <h4 class="secondary-text  text-center">{{ $t('create.dec') }}</h4>
        <v-form @submit.prevent="submit">
            <div class="pt-8 pb-5">
                <v-text-field
                    v-model="password"
                    :rules="[rules.password]"
                    :label="$t('create.createPW')"
                    persistent-hint
                    variant="solo"
                    :placeholder="$t('create.createPW')"
                    :type="passwordStatus ? 'password': 'text'"
                    :append-inner-icon="passwordStatus ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="passwordStatus = !passwordStatus"
                ></v-text-field>
                <p class="pa-2"></p>
                <v-text-field
                    v-model="confirmPassword"
                    :rules="[confirmPW]"
                    :label="$t('create.confirmPW')"
                    persistent-hint
                    variant="solo"
                    :placeholder="$t('create.confirmPW')"
                    :type="confirmStatus ? 'password': 'text'"
                    :append-inner-icon="confirmStatus ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append-inner="confirmStatus = !confirmStatus"
                ></v-text-field>
            </div>
            <v-checkbox hide-details v-model="sync" :label="$t('create.sync')"></v-checkbox>

            <v-checkbox v-model="terms" :rules="[rules.terms]" class="terms-checkbox mb-5" height="40px">
                <template v-slot:label>
                    {{ $t('create.termsDec') }}
                    <a href="#" class="pl-1">{{ $t('create.termsLink') }}</a>
                </template>
                <template v-slot:message>
                    <p class="pl-10" v-show="!terms">{{ rules.terms(terms) }}</p>
                </template>
            </v-checkbox>

            <v-btn class="mt-3" type="submit" block size="x-large" append-icon="mdi-tag-arrow-right">{{
                    $t('create.btn')
                }}
            </v-btn>
        </v-form>
    </section>
</template>
<style scoped lang="scss">
.create {
    min-width: $mainBlockMinWidth;
    width: 480px;
}

.logo {
    margin: 0 auto;
    width: 60px;

}

@media (max-width: 960px) {
    .create {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
}
</style>
