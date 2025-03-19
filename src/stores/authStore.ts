import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useMessageStore } from './messageStore.ts'


export const useAuthStore = defineStore('authStore', () => {
    
    const router = useRouter()
    const messageStore = useMessageStore()

    const email = ref('')
    const password = ref('')
    const fullname = ref('')
    const date_birth = ref('')
    const isLoading = ref(false)
    const code = ref('')

    const logIn = async () => {
        try {
            isLoading.value = true
            if (email.value && password.value) {
                localStorage.setItem('email', email.value)
                let response = await axios.post(`/auth/login`, {
                    email: email.value,
                    password: password.value,
                });
                console.log(response);
                let { detail } = response.data;
                if (detail == "Code is sent") {
                    router.push({ name: "enterCode" });
                }
            }
        } catch (err) {
            console.log(err);
            if (err.response) {
                messageStore.message = err.response.data.detail
                setTimeout(() => {
                    messageStore.message = ''
                }, 5000);
            }
        } finally {
            isLoading.value = false
        }
    }

    const verifyCode = async () => {
        try {
            isLoading.value = true
            if (code.value) {
            let response = await axios.post(`/auth/verify_code`, {
                email: email.value,
                code: code.value,
            });
                console.log(response);
                let { token } = response.data
                if (token) {
                    localStorage.setItem('token', token)
                }
                router.push({ name: 'chat' })
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
    
    const createAccount = async () => {
        try {
            isLoading.value = true
            let response = await axios.post(`/auth/register`, {
                name: fullname.value,
                email: email.value,
                password: password.value,
                date_of_birth: date_birth.value
            });
            console.log(response);
            if (response.status == 200) {
                router.push({ name: 'login' })
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
    

  return { date_birth, email, password, fullname, isLoading, logIn, code, verifyCode, createAccount }
})