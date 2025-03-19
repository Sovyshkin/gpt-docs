<script setup>
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
import { useAuthStore } from "@/stores/authStore.ts";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const goNext = () => {
  try {
    if (authStore.fullname && authStore.date_birth) {
      authStore.createAccount();
    }
  } catch (err) {
    console.log(err);
  }
};

const goBack = () => {
  try {
    router.go(-1);
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <h2 class="title">Tell us about yourself.</h2>
      <div class="group">
        <label for="name" class="group-value">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="authStore.fullname"
          class="group-item"
          placeholder="Enter your full name"
        />
      </div>
      <div class="group">
        <label for="code" class="group-value">Date of birth</label>
        <input
          type="date"
          id="date-birth"
          name="date-birth"
          v-model="authStore.date_birth"
          class="group-item"
          placeholder="__.__.____"
        />
      </div>
      <span class="desc"
        >By clicking "Continue", you agree to our
        <a href="">terms and conditions</a> and have read our
        <a href="">privacy policy.</a></span
      >
      <div class="wrap-btns">
        <button class="btn continue" type="button" @click="goNext()">
          Continue
        </button>
        <button class="btn back" type="button" @click="goBack()">Back</button>
      </div>
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
.title {
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
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

.desc {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  text-align: center;
  color: rgba(20, 23, 31, 0.4);
}

.desc a {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  text-align: center;
  color: #005eff;
}
</style>
