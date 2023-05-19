<script setup lang="ts">
</script>

<template>
    <section class="create rounded-0 bg-white rounded-xl pa-8 pt-10 pb-8 ">
        <v-img class="logo" :src="logoSecondary"></v-img>
        <h1 class="primary-text text-capitalize text-center font-weight-bold">{{ $t('create.title') }}</h1>
        <h4 class="secondary-text  text-center">{{ $t('create.dec') }}</h4>
        <div class="pt-8 pb-5">
            <v-text-field
                :label="$t('create.createPW')"
                persistent-hint
                variant="solo-filled"
                :placeholder="$t('create.createPW')"
                clearable
            ></v-text-field>
            <p class="pa-2"></p>
            <v-text-field
                :label="$t('create.confirmPW')"
                persistent-hint
                variant="solo-filled"
                :placeholder="$t('create.confirmPW')"
                clearable
            ></v-text-field>
        </div>
        <v-checkbox>
            <template v-slot:label>
                {{$t('create.termsDec')}}
                <a href="#" class="pl-1">{{$t('create.termsLink')}}</a>
            </template>
        </v-checkbox>
        <v-btn class="mt-3" block size="x-large" append-icon="mdi-tag-arrow-right">{{$t('create.btn')}}</v-btn>
    </section>
</template>

<style scoped lang="scss">
.create {
    min-width: $mainBlockMinWidth;
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
