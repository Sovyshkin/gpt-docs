import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useMessageStore } from './messageStore.ts';


export const useAccountStore = defineStore('accountStore', () => {
    
    const messageStore = useMessageStore()
    const router = useRouter()
    const active = ref(1)
    const email = ref(localStorage.getItem('email') || '')
    const fullname = ref('testName')
    const token = localStorage.getItem('token')
    const new_password1 = ref('')
    const new_password2 = ref('')
    const isLoading = ref(false)
    const isLoading2 = ref(false)
    const isLoading3 = ref(false)

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
            isLoading.value = true
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
        } finally {
            isLoading.value = false
        }
    }

    const updateUser = async () => {
        try {
            isLoading3.value = true
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
        } finally {
            isLoading3.value = false
        }
    }

    const changePassword = async () => {
        try {
            isLoading2.value = true
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
        } finally {
            isLoading2.value = false
        }
    }

    const go_add_company = () => {
        try {
          router.push({ name: "newCompany" });
        } catch (err) {
          console.log(err);
        }
      }

  return { active, go_add_company, isLoading, isLoading2, isLoading3, email, fullname, logOut, getUser, updateUser, changePassword }
})