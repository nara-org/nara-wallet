<script setup lang="ts">
import {ref, computed} from "vue";

interface Item {
    title: string,
    value: string,
    logo?: string
}

const props = defineProps<{
    list: Item[],
    text: boolean,
    modelValue: Item,
}>()
const $emit = defineEmits(['update:modelValue']);

const selectVal = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        $emit('update:modelValue', value)
    }
})


</script>

<template>
    <v-select
        label=""
        :items="list"
        variant="solo"
        hide-details
        color="secondary"
        :flat="text"
        v-model="selectVal"
        density="compact"
        class="bridge-select"
        :class="text ? 'bridge-select-text' : ''"
        menu-icon="mdi-chevron-down"
    >
        <template v-slot:selection="{item, index}">
            <v-list-item
                v-if="item.value"
                :subtitle="text ? '' : item.title"
                :title="item.title"
                :value="item.value"
                density="compact"
                class="pl-0 ml-0"
                height="48"
            >
                <template v-slot:prepend>
                    <v-avatar color="white">
                        <v-img width="48" v-if="item.value" height="48"
                               :src="item.raw.logo"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
            <v-list-item v-else title="Select a network" density="compact"
                         class="pl-0 ml-0 text-grey">
                <template v-slot:prepend>
                    <v-avatar style="width: 5px" color="white">
                    </v-avatar>
                </template>
            </v-list-item>
        </template>

        <template v-slot:item="{item, index, props}">
            <v-list-item
                :subtitle="item.title"
                :title="item.title"
                :value="item.value"
                lines="two"
                v-bind="props"
            >
                <template v-slot:prepend>
                    <v-avatar color="white">
                        <v-img width="48" height="48" :src="item.raw.logo"></v-img>
                    </v-avatar>
                </template>
            </v-list-item>
        </template>
    </v-select>
</template>


<style>
.bridge-select .v-field__prepend-inner, .v-field__append-inner, .v-field__clearable {
    align-items: center !important;
}
.bridge-select-text{
    max-width: 200px;
}
</style>
<style scoped>

</style>
