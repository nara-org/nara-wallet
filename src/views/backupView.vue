<script setup lang="ts">
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
                {{ $t('backup.dec') }}
            </v-card-text>

            <div class="skeleton">
                <v-skeleton-loader elevation="10" color="primary" type="article"></v-skeleton-loader>
            </div>

            <v-card-title class="text-capitalize font-weight-regular text-h6">
                {{ $t('warning') }}
            </v-card-title>
            <v-card-text>
                {{ $t('backup.warningDec') }}
            </v-card-text>
            <v-checkbox :label="$t('backup.saveDec')">
            </v-checkbox>
            <v-btn class="mt-3 text-capitalize" block size="large" append-icon="mdi-lock-open-check-outline">{{$t('backup.btn')}}</v-btn>
        </v-card>
    </section>
</template>

<style scoped lang="scss">
.select {
    max-width: 460px;
    min-height: 50vh;
}
.skeleton{
    display: block;
    margin: 2rem 0;
}
.logo {
    margin: 0 auto;
    width: 60px;

}
@media (max-width: 960px) {
    .select {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
}
</style>
