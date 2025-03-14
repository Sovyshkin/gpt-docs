import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useMessageStore } from './messageStore.ts'


export const useRecoveryStore = defineStore('recoveryStore', () => {
    
    const router = useRouter()
    const messageStore = useMessageStore()
    const email = ref('')

    const send_mail = async () => {
        try {
            if (email.value) {
                let response = await axios.post(`/auth/send_code_to_recovery`, {
                    email: email.value
                })
                console.log(response)
                let detail = response.data.detail
                if (detail == 'Recovery code sent') {
                    router.push({ name: 'emailSent' })
                }
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        }
    }

  return { email, send_mail }
})