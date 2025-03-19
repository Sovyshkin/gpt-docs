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
    const token = localStorage.getItem('token')
    const new_password1 = ref('')
    const new_password2 = ref('')

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

    const getUser = async () => {
        try {
            let response = await axios.get(`/users/get`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
            fullname.value = response.data.user.name
            email.value = response.data.user.email
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000)
        }
    }

    const updateUser = async () => {
        try {
            let response = await axios.post(`/users/update`, {
                email: email.value,
                name: fullname.value
            }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
            })
            console.log(response);
            if (response.data.status == 'ok') {
                    messageStore.message = 'Success'
                messageStore.status = '200'
                messageStore.desc = response.data.detail
                    setTimeout(() => {
                        messageStore.message = ''
                        messageStore.status = ''
                        messageStore.desc = ''
                }, 5000)
                }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000)
        }
    }

    const changePassword = async () => {
        try {
            if (new_password1.value == new_password2.value) {
                let response = await axios.post(`/users/change_password`, {
                    new_password: new_password1.value
                }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                })
                console.log(response);
                if (response.data.status == 'ok') {
                    messageStore.message = 'Success'
                    messageStore.status = '200'
                    setTimeout(() => {
                        messageStore.message = ''
                        messageStore.status = ''
                }, 5000)
                }
            }
        } catch (err) {
            console.log(err);
            messageStore.message = err.response.data.detail
            setTimeout(() => {
                messageStore.message = ''
            }, 5000)
        }
    }

  return { email, fullname, logOut, getUser, updateUser, changePassword }
})