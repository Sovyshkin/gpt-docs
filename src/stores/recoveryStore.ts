import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { useMessageStore } from './messageStore.ts'


export const useRecoveryStore = defineStore('recoveryStore', () => {
    
    const router = useRouter()
    const route = useRoute()
    const messageStore = useMessageStore()
    const email = ref('')
    const new_password = ref('')
    const confirm_password = ref('')
    const isLoading = ref(false)
    const token = route.query.token

    const send_mail = async (resend) => {
        try {
            isLoading.value = true
            if (email.value) {
                let response = await axios.post(`/auth/send_recovery_link`, {
                    email: email.value
                })
                console.log(response)
                let detail = response.data.detail
                if (detail == 'Recovery link sent') {
                    if (resend) {
                        messageStore.message = 'Success'
                        messageStore.status = '200'
                         setTimeout(() => {
                             messageStore.message = ''
                             messageStore.status = ''
                        }, 5000);
                    } else {
                        router.push({ name: 'emailSent' })
                    }
                }
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

    const resetPass = async () => {
        try {
            isLoading.value = true
            if (new_password.value == confirm_password.value && token) {
                let response = await axios.post(`/auth/password_reset`, {
                    token: token,
                    new_password: new_password.value,
                })
                console.log(response);
                if (response.status == 200) {
                    messageStore.message = 'Success'
                    messageStore.desc = response.data.detail
                    messageStore.status = '200'
                    setTimeout(() => {
                        messageStore.message = ''
                        messageStore.desc = ''
                        messageStore.status = ''
                        router.push({ name: 'login' })
            }, 3000);
                }
            } else {
                messageStore.message = 'Incorrect'
                messageStore.status = '400'
                messageStore.desc = 'Passwords must match'
            setTimeout(() => {
                messageStore.message = ''
                 messageStore.status = ''
                messageStore.desc = ''
            }, 5000);
            }
            
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000);
        } finally {
            isLoading.value = false
        }
    }

  return {isLoading, new_password, confirm_password, resetPass, email, send_mail }
})