import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'


export const useAccountStore = defineStore('accountStore', () => {
    
    const router = useRouter()
    const email = ref(localStorage.getItem('email') || '')
    const fullname = ref('testName')    

    const logOut = () => {
        try {
            localStorage.clear()
            router.push({ name: "login" })
        } catch (err) {
            console.log(err)
        }
    }

  return { email, fullname, logOut }
})