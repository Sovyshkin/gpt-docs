<script setup>
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
import { useRecoveryStore } from "@/stores/recoveryStore.ts";
import AppLoader from "../AppLoader.vue";
const recoveryStore = useRecoveryStore();
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <img src="../../assets/email.svg" alt="" />
      <div class="wrap-title">
        <h2 class="title">Check your email</h2>
        <span class="subtitle"
          >We have sent the password reset instructions to the following email
          address. Make sure that you have received the email.</span
        >
      </div>
      <button
        class="btn back"
        type="button"
        @click="recoveryStore.send_mail(true)"
        v-if="!recoveryStore.isLoading"
      >
        Resend the email
      </button>
      <AppLoader v-if="recoveryStore.isLoading" />
    </div>
    <AppTerms />
  </div>
</template>
<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.card {
  width: 380px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.wrap-title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.title {
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #14171f;
}
.subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #14171f;
  text-align: center;
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.wrap-btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 14.5px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.continue {
  background-color: #005eff;
  color: #fff;
}

.back {
  background-color: #f8f9fc;
  color: #14171f;
}
</style>
