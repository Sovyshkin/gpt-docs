<script setup>
/* eslint-disable */
import { ref } from "vue";
import axios from "axios";
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
import AppLoader from "../AppLoader.vue";
import { useAuthStore } from "@/stores/authStore.ts";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const passOpen = ref(false);
const emailInvalid = ref(false);
const passInvalid = ref(false);

const openPass = () => {
  try {
    let passNode = document.querySelector(`#password`);
    passNode.type = "text";
    passOpen.value = true;
  } catch (err) {
    console.log(err);
  }
};

const closePass = () => {
  try {
    let passNode = document.querySelector(`#password`);
    passNode.type = "password";
    passOpen.value = false;
  } catch (err) {
    console.log(err);
  }
};

const goForgot = () => {
  try {
    router.push({ name: "checkEmail" });
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <AppLoader v-if="authStore.isLoading" />
    <div class="card" v-else>
      <h2 class="title">Log in</h2>
      <div class="group">
        <label for="email" class="group-value">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="authStore.email"
          class="group-item"
          placeholder="john@gmail.com"
          @blur="saveEmail"
        />
      </div>
      <div class="group">
        <label for="password" class="group-value">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="authStore.password"
          class="group-item"
          :class="{ invalid: passInvalid }"
          placeholder="password"
        />
        <img
          src="../../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen"
          @click="openPass()"
        />
        <img
          src="../../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen"
          @click="closePass()"
        />
      </div>
      <div class="wrap-forgot">
        <span class="forgot" @click="goForgot">Forgot password?</span>
      </div>
      <button class="btn continue" type="button" @click="authStore.logIn">
        Log in
      </button>
      <div class="wrap-sign">
        <span class="sign">Don't have an account?</span>
        <a @click="$router.push({ name: 'register' })" href="#">Sign up</a>
      </div>
      <div class="wrap-hr">
        <div class="hr"></div>
        <span>or</span>
        <div class="hr"></div>
      </div>
      <!-- <button class="btn google">
        <img src="@/assets/google.png" alt="" />
        <span>Log in with Google</span>
      </button> -->
      <GoogleLogin />
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

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

h1 span {
  color: #005eff;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
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
  cursor: default;
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

.sign {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

.wrap-sign {
  display: flex;
  gap: 4px;
}

.wrap-sign a {
  color: #005eff;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  opacity: 100%;
}

.wrap-hr {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
}

.wrap-hr span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

.google {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  border: 1px solid #dfe3ec;
}

.google span {
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.password-img {
  position: absolute;
  height: 16px;
  width: 16px;
  cursor: pointer;
  right: 3%;
  top: 55%;
}

.wrap-forgot {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.forgot {
  color: #005eff;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
}

.invalid {
  border: 1px solid #df3a44;
  color: #df3a44;
}

.g-signin2 {
  height: 100px;
  width: 100%;
}
</style>
