<script setup lang="ts">
defineProps<{
    msg: string,
}>()

const emit = defineEmits(['copy'])

const num: number = Math.floor(Math.random() * 10000);

function copy() {
    try {
        let input: any = document.getElementById('copy' + num);
        input.select();
        document.execCommand("copy");
        emit('copy', true);
    } catch (e) {
        console.log(e);
        emit('copy', false);
    }
}

</script>

<template>
    <div class="copy-box" @click="copy">
        <input type="text" class="copy-input" :value="msg" :id="'copy' + num"/>
        <slot name="btn"></slot>
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
