<script setup lang="ts">
</script>

<template>
    <section class="select rounded-0 pt-10 pb-5 pa-lg-8">
        <h1 class="text-center text-h5 font-weight-bold on-secondary-text text-capitalize">{{ $t('newWallet') }}</h1>

        <v-card class="mt-6 pa-5 pb-8 text-center">
            <v-card-title class="text-capitalize">
                {{ $t('select.createTitle') }}
            </v-card-title>
            <v-card-text>
                {{ $t('select.createDec') }}
            </v-card-text>
            <v-btn class="mt-3 text-capitalize" block size="large" append-icon="mdi-key-plus">{{$t('select.createBtn')}}</v-btn>
        </v-card>

        <v-card class="mt-10 pa-5 pb-8 text-center">
            <v-card-title class="text-capitalize">
                {{ $t('select.importTitle') }}
            </v-card-title>
            <v-card-text>
                {{ $t('select.importDec') }}
            </v-card-text>
            <v-btn class="mt-3 text-capitalize" block size="large" append-icon="mdi-cellphone-key">{{$t('select.importBtn')}}</v-btn>
        </v-card>
    </section>
</template>

<style scoped lang="scss">
.select {
    max-width: 460px;
    min-height: 50vh;
}
@media (max-width: 960px) {
    .select {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
}
</style>
