import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from "vue-router";


export const useMenuStore = defineStore('menuStore', () => {
    
  const router = useRouter();
  const route = useRoute()
  const menu = ref(false)
  const welcomeShow = ref(false)
  const token = ref(localStorage.getItem('token'))

  const checkToken = () => {
    try {
      token.value = localStorage.getItem('token')
      if (!token.value && !route.path.includes("auth")) {
        welcomeShow.value = true
      }
    } catch (err) {
      console.log(err);
    }
  }

  const goRoute = (name) => {
    try {
      welcomeShow.value = false
      router.push({ name });
    } catch (err) {
      console.log(err);
    }
  };
    
  return {menu, welcomeShow, checkToken, goRoute }
})