import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useMessageStore } from './messageStore.ts';


export const useAccountStore = defineStore('accountStore', () => {
    
    const messageStore = useMessageStore()
    const router = useRouter()
    const email = ref(localStorage.getItem('email') || '')
    const fullname = ref('testName')    

    const logOut = () => {
        try {
            localStorage.clear()
            router.push({ name: "login" })
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000)
        }
    }

  return { email, fullname, logOut }
})