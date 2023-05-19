import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

/*
* 1. The user enters the password to create the mnemonic
* 2. Mnemonic generation seed
* 3.seed generated address
* 4. Save address
*
*
* */

export const useAccountStore = defineStore('account', () => {
  const count = ref(0)

  return { count }
})
