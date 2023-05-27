<script setup lang="ts">
import {ref} from "vue";

defineProps<{
    msg: string,
}>()
const copyState = ref(false);
const emit = defineEmits(['copy'])

const num: number = Math.floor(Math.random() * 10000);

let time:number;

function copy() {
    try {
        let input: any = document.getElementById('copy' + num);
        input.select();
        document.execCommand("copy");
        copyState.value = true;

        if(time) clearTimeout(time);

        time = setTimeout(() => {
            copyState.value = false;
        }, 3000);
        emit('copy', true);
    } catch (e) {
        console.log(e);
        copyState.value = false;
        emit('copy', false);
    }
}

</script>

<template>
    <div class="copy-box" @click="copy">
        <input type="text" class="copy-input" :value="msg" :id="'copy' + num"/>
        <slot name="btn" :status="copyState"></slot>
        <slot :status="copyState"></slot>
    </div>
</template>

<style scoped>
.copy-box {
    display: inline-grid;
}

.copy-input {
    position: absolute;
    left: -99999px;
    z-index: 0;
}
</style>
