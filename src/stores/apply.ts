import {ref, computed, reactive, toRaw} from 'vue'
import {defineStore} from 'pinia'

export const useApplyStore = defineStore('apply', () => {
    const menuStatus = ref(false);

    function switchMenu(){
        menuStatus.value = !menuStatus.value;
    }

    return {
        menuStatus,
        switchMenu,
    }


})
