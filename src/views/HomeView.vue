<script setup lang="ts">
</script>

<template>

    <v-main class="main-box scroll-box">
        <v-container class="">
            <div class="text-center mb-3">
                <v-chip size="small" color="white" class="ma-2" rounded variant="outlined" link>
                    Closable
                    <v-icon end size="" icon="mdi-content-copy"></v-icon>
                </v-chip>
            </div>
            <v-card class="btn-box">
                <v-card-text>
                    <div class="text-center pb-5">
                        <span class="text-h4 mr-2">100</span>
                        <span class="text-grey">Nara</span>
                    </div>
                    <v-row align="center">
                        <v-col>
                            <div class="text-center bg-primary-opacity rounded ">
                                <v-icon icon="mdi-shopping" size="x-large"></v-icon>
                                <p class="pt-2">Buy</p>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="text-center bg-primary-opacity rounded  ">
                                <v-icon icon="mdi-send" size="x-large"></v-icon>
                                <p class="pt-2">Send</p>
                            </div>
                        </v-col>
                        <v-col>
                            <div class="text-center bg-primary-opacity rounded ">
                                <v-icon icon="mdi-bridge" size="x-large"></v-icon>
                                <p class="pt-2">Bridge</p>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <div class="trust-lines-box">
                <div class="trust-lines d-flex">
                    <v-icon icon="mdi-plus-circle-multiple-outline" class="mr-2"></v-icon>
                    <h4 class="text-h6">Trust Coins</h4>
                    <v-spacer></v-spacer>
                    <v-icon icon="mdi-arrow-u-right-top" class="mr-2"></v-icon>
                </div>
            </div>

            <CoinList class="pa-0 mt-8"></CoinList>
        </v-container>
    </v-main>

</template>

<style scoped lang="scss">


.trust-lines-box {
    margin-top: 20px;
}

.trust-lines {
    display: flex;
    background: rgba($background, 0.9);
    padding: 12px 20px;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: $secondary;
    cursor: pointer;
}

.btn-box {
    background: rgba($background, 0.92);
}

.bg-primary-opacity {
    //background: rgba($secondary, 0.9);
    //color: $background;
    color: $secondary;
    //border: solid 1px $secondary;
}

.bg-primary-opacity:hover {
    cursor: pointer;
}

</style>