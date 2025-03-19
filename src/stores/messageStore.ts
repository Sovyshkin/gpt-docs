import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'


export const useMessageStore = defineStore('messageStore', () => {
    
    const router = useRouter()
    const message = ref('') // Success message
    const desc = ref('')
    const status = ref('')

    const closeMessage = () => {
        try {
            message.value = ''
        } catch (err) {
            console.log(err);
        }
    }

    watch(message, () => {
        if (message.value == 'Invalid token' || message.value == 'Token expired' || message.value == 'Not authenticated') {
            message.value = ''  
            localStorage.clear()
            router.push({ name: 'login' })
        }
    })
    
  return { message, desc, status, closeMessage }
})