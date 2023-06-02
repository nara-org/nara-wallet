<script setup lang="ts">

import {onMounted, ref, reactive} from "vue";
import {useClientStore} from "@/stores/client";

const clientStore = useClientStore();
const trustData = ref([
    {
        currency: 'USD',
        issuer: 'rUzvuVBLmb3bieuWjW4hNecXFanqScdp6X',
        loading: false,
        switch: false,
        value: '1000000000',
    },{
        currency: 'CNY',
        issuer: 'rhrNfAWdrzJsMrvKPCz1E29QoNXp22RZAH',
        loading: false,
        switch: false,
        value: '1000000000',
    },{
        currency: 'PYG',
        issuer: 'rhrNfAWdrzJsMrvKPCz1E29QoNXp22RZAH',
        loading: false,
        switch: false,
        value: '1000000000',
    },{
        currency: 'THB',
        issuer: 'rhrNfAWdrzJsMrvKPCz1E29QoNXp22RZAH',
        loading: false,
        switch: false,
        value: '1000000000',
    },
])

onMounted(async () => {
    if(clientStore.isConnected){
        initSwitch();
    }else{
        clientStore.client.once('connected', async () => {
            await clientStore.getBalances();
            initSwitch();
        })
    }
})

async function trustSet(item, index:number){
    if(!item.switch){
        item.loading = true;
        try{
            await clientStore.trustSet({
                currency : item.currency,
                issuer : item.issuer,
                value : item.value,
            })
            // console.log(trustData.value);
            trustData.value[index].switch = true;
        }catch (e) {
            console.log(e);
            trustData.value[index].switch = false;
        }
        item.loading = false;
    }
}

function initSwitch() {
    clientStore.balances.forEach(item => {
        trustData.value.findIndex((trust, index) => {
            if(trust.currency === item.currency && trust.issuer === item.issuer){
                trustData.value[index].switch = true;
                return true;
            }
        })
    })
}
</script>

<template>

    <v-main class="main-box scroll-box">
        <section class="pa-5 trust-box">
            <v-alert prominent color="white" border="start" variant="tonal"  icon="mdi-lock-open-alert-outline" density="compact">
                <p class="text-body-2">{{ $t('trustDes') }}</p>
            </v-alert>
            <ul class="trust">
                <li v-for="(item, index) in trustData" :class="'theme-' + index%4">
                    <i>{{item.currency.charAt(0)}}</i>
                    <div class="trust-name">
                        <h4 class="text-h6 text-uppercase">{{ item.currency }}</h4>
                        <p class="text-body-2">
                            <span class="text-grey">issuer:</span>
                            {{item.issuer.substring(0, 4)}}
                            ...
                            {{item.issuer.substring(item.issuer.length - 4)}}
                        </p>
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                        <v-switch :readonly="item.switch" @click="trustSet(item, index)" :disabled="!clientStore.balancesStatus" color="primary" hide-details
                                  :model-value="item.switch"
                                  :loading="item.loading || !clientStore.balancesStatus ? 'success' : false"
                        ></v-switch>
                    </div>
                </li>
            </ul>
        </section>
    </v-main>

</template>

<style scoped lang="scss">
.trust-box{
    .trust{
        display: block;
        padding-top: 16px;
        li{
            display: flex;
            place-items: center;
            background: rgba($background, 0.92);
            border-radius: 5px;
            padding: 8px 12px;
            margin-bottom: 16px;
            box-shadow: 0px 0px 8px #333;
            &.theme-0{
                $theme: rgba($primary, 0.8);

                i{
                    background: $theme;
                }
                .trust-name{
                    h4{
                        color:$theme;
                    }
                }
            }
            &.theme-1{
                $theme: rgba($secondary, 0.9);
                i{
                    background: $theme;
                }
                .trust-name{
                    h4{
                        color:$theme;
                    }
                }
            }
            &.theme-2{
                $theme: rgba($primary, 0.95);
                i{
                    background: $theme;
                }
                .trust-name{
                    h4{
                        color:$theme;
                    }
                }
            }
            &.theme-3{
                $theme: rgba($secondary, 0.95);
                i{
                    background: $theme;
                }
                .trust-name{
                    h4{
                        color:$theme;
                    }
                }
            }
            i{
                $size: 40px;
                display: block;
                width: $size;
                height: $size;
                background: $primary;
                border-radius: $size;
                text-align: center;
                color: white;
                font-size: 24px;
                font-style: normal;
                margin-right: 12px;
            }
            .trust-name{
                h4{
                    color: $primary;
                    line-height: 1;
                }
                p{
                    padding-top: 5px;
                }
            }
        }
    }
}

</style>