<script setup>
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
import AppLoader from "../AppLoader.vue";
import { useRecoveryStore } from "@/stores/recoveryStore.ts";
import { ref } from "vue";

const recoveryStore = useRecoveryStore();

const passOpen = ref(false);
const passOpen2 = ref(false);
const passInvalid = ref(false);
const passInvalid2 = ref(false);
const openPass = (n) => {
  try {
    if (n == 1) {
      passOpen.value = true;
      let passNode = document.querySelector(`#password`);
      passNode.type = "text";
    } else if (n == 2) {
      passOpen2.value = true;
      let passNode = document.querySelector(`#password2`);
      passNode.type = "text";
    }
  } catch (err) {
    console.log(err);
  }
};

const closePass = (n) => {
  try {
    if (n == 1) {
      passOpen.value = false;
      let passNode = document.querySelector(`#password`);
      passNode.type = "password";
    } else if (n == 2) {
      passOpen2.value = false;
      let passNode = document.querySelector(`#password2`);
      passNode.type = "password";
    }
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <div class="wrap-title">
        <h2 class="title">Password Reset</h2>
        <span class="subtitle"
          >To change the password, enter the new password below.</span
        >
      </div>
      <div class="group">
        <label for="password" class="group-value">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="recoveryStore.new_password"
          class="group-item"
          :class="{ invalid: passInvalid }"
          placeholder="password"
        />
        <img
          src="../../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen"
          @click="openPass(1)"
        />
        <img
          src="../../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen"
          @click="closePass(1)"
        />
      </div>
      <div class="group">
        <label for="password2" class="group-value">Confirm password</label>
        <input
          type="password"
          id="password2"
          name="password"
          v-model="recoveryStore.confirm_password"
          class="group-item"
          :class="{ invalid: passInvalid2 }"
          placeholder="password"
        />
        <img
          src="../../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen2"
          @click="openPass(2)"
        />
        <img
          src="../../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen2"
          @click="closePass(2)"
        />
      </div>
      <button
        class="btn continue"
        type="button"
        v-if="!recoveryStore.isLoading"
        @click="recoveryStore.resetPass()"
      >
        Change password
      </button>
      <AppLoader v-else />
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

.sign {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
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
</style>
