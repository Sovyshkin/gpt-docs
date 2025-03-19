<script setup>
import { useMenuStore } from "@/stores/menuStore.ts";
const menuStore = useMenuStore();
</script>
<template>
  <div class="card">
    <div class="wrap-title">
      <h1 class="title">Welcome back!</h1>
      <span class="subtitle">Enter the information below to log in.</span>
    </div>
    <div class="hr"></div>
    <button class="btn log" @click="menuStore.goRoute('login')">Log in</button>
    <button class="btn sign" @click="menuStore.goRoute('register')">
      Sign Up
    </button>
  </div>
</template>
<style scoped>
.card {
  width: 380px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  background-color: #fff;
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
}

.hr {
  width: 100%;
  height: 1px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}

.btn {
  width: 100%;
  padding: 14.5px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.log {
  background-color: #005eff;
  color: #fff;
}

.sign {
  background-color: #f8f9fc;
  color: #14171f;
}
</style>
