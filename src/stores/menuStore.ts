import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'


export const useMenuStore = defineStore('menuStore', () => {
    
    const menu = ref(false)
    
  return { menu }
})