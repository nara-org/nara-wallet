<script setup lang="ts">
const emit = defineEmits(['coin'])

function clickItem(){
    emit("coin", {
        data : 'data'
    });
}

</script>

<template>

    <div class="coin-list">
        <h6 class="coin-list-title text-subtitle-2">
            <v-icon class="mr-1">mdi-format-list-bulleted</v-icon>
            Coin List
        </h6>
        <ul>
            <li @click="clickItem">
                <i>N</i>
                <div class="coin-name">
                    <p class="text-body-1">Nara</p>
                    <small>Nara</small>
                </div>
                <v-spacer></v-spacer>
                <div class="coin-banner">
                    <span class="text-h6">14111111.91</span><small>Nara</small>
                </div>
            </li>
            <li>
                <i>N</i>
                <div class="coin-name">
                    <p class="text-body-1">Nara</p>
                    <small>Nara</small>
                </div>
                <v-spacer></v-spacer>
                <div class="coin-banner">
                    <span class="text-h6">14.91</span><small>Nara</small>
                </div>
            </li>
            <li>
                <i>N</i>
                <div class="coin-name">
                    <p class="text-body-1">Nara</p>
                    <small>Nara</small>
                </div>
                <v-spacer></v-spacer>
                <div class="coin-banner">
                    <span class="text-h6">14.91</span><small>Nara</small>
                </div>
            </li>
            <li>
                <i>N</i>
                <div class="coin-name">
                    <p class="text-body-1">Nara</p>
                    <small>Nara</small>
                </div>
                <v-spacer></v-spacer>
                <div class="coin-banner">
                    <span class="text-h6">14.91</span><small>Nara</small>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.coin-list-wrap {
    background: linear-gradient($primary, $secondary);
}

.coin-list {
    padding: 20px;

    .coin-list-title {
        padding: 10px 0;
        color: #fff;
    }

    ul {
        display: block;

        li {
            background: rgba($background, 0.9);
            width: 100%;
            display: flex;
            place-items: center;
            cursor: pointer;
            padding: 12px 20px;
            margin-bottom: 8px;
            border-radius: 8px;

            i {
                $iSize: 36px;
                width: $iSize;
                height: $iSize;
                background: $secondary;
                color: $background;
                font-size: 18px;
                text-align: center;
                border-radius: 20px;
                font-style: normal;
                line-height: $iSize;
            }

            .coin-name {
                margin-left: 10px;

                p {
                    line-height: 1;
                }

                small {
                    padding-left: 1px;
                }
            }

            .coin-banner {
                span {
                    color: $primary;
                }
            }
        }
    }
}
</style>
