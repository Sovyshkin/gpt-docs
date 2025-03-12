import { createApp } from "vue";
import { createPinia } from "pinia"; // Импортируем Pinia
import App from "./App.vue";
import axios from "axios";
import router from "./router/router";
import vue3GoogleLogin from "vue3-google-login";

axios.defaults.baseURL = "http://38.180.137.72:9000/v1";

const pinia = createPinia();

createApp(App)
  .use(vue3GoogleLogin, {
    clientId:
      "881173154347-brk80ndvnjq1rti79kqo2k19b9g5m0pj.apps.googleusercontent.com",
  })
  .use(pinia)
  .use(router)
  .mount("#app");
