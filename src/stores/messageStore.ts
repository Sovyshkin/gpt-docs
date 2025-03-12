import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'


export const useMessageStore = defineStore('messageStore', () => {
    
    const message = ref('') // Success message
    const desc = ref('')
    const status = ref('')

    const closeMessage = () => {
        try {
            message.value = ''
        } catch (err) {
            console.log(err)
        }
    }
    
  return { message, desc, status, closeMessage }
})