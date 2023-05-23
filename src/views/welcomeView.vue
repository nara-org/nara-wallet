<script setup lang="ts">

</script>

<template>
    <section class="welcome rounded-0 bg-white rounded-xl pt-10 pb-5 pa-5 ">
        <v-img class="logo" :src="logoSecondary"></v-img>
        <h1 class="primary-text text-capitalize text-center font-weight-bold">{{ $t('welcome') }}</h1>
        <h4 class="secondary-text  text-center">{{ $t('welcomeDec') }}</h4>
        <v-card class="mt-5" variant="text">
            <div class="font-weight-medium pl-5 secondary-text">
                {{ $t('advantage') }}
            </div>
            <v-card-text class="pt-2 pb-3">
                <v-timeline density="compact" align="center" line-thickness="1">
                    <v-timeline-item
                        v-for="(index, endIndex) in 5"
                        :key="index"
                        size="x-small"
                        :dot-color="'deep-purple-lighten-' + endIndex"
                    >
                        <div class="mb-0">
                            <div>{{ $t('welcomeDecList.' + index) }}</div>
                        </div>
                    </v-timeline-item>
                </v-timeline>
            </v-card-text>
        </v-card>
        <v-btn class="mt-3" block size="x-large" to="/select" append-icon="mdi-tag-arrow-right">{{$t('started')}}</v-btn>
    </section>
</template>

<style scoped lang="scss">
.welcome {
    min-width: $mainBlockMinWidth;
}
@media (max-width: 960px) {
    .welcome {
        width: 360px;
        min-width: auto;
        min-height: 50vh;
    }
}
.logo {
    margin: 0 auto;
    width: 60px;

}
</style>
