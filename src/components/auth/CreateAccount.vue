<script setup>
import { ref } from "vue";
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
import AppLoader from "../AppLoader.vue";
import { useAuthStore } from "../../stores/authStore.ts";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const passOpen = ref(false);
const step = ref(1);

const goNext = async () => {
  try {
    if (step.value == 2 && authStore.email && authStore.password) {
      router.push({ name: "tellUs" });
    } else {
      if (authStore.email || authStore.password) {
        step.value++;
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const goBack = () => {
  try {
    if (step.value > 1) {
      step.value--;
    }
  } catch (err) {
    console.log(err);
  }
};

const goLog = () => {
  try {
    router.push({ name: "login" });
  } catch (err) {
    console.log(err);
  }
};

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
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <div class="wrap-title">
        <h2 class="title">Create an account</h2>
        <span class="subtitle">Create a password for the GPT Document</span>
      </div>
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
      <div class="group" v-if="step == 2">
        <label for="password" class="group-value">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="authStore.password"
          class="group-item"
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
      <div class="wrap-btns">
        <button
          class="btn continue"
          v-if="!authStore.isLoading"
          type="button"
          @click="goNext()"
        >
          Continue
        </button>
        <AppLoader v-else />
        <button class="btn back" type="button" @click="goBack()">Back</button>
      </div>
      <div class="wrap-sign">
        <span class="sign">Do you already have an account?</span>
        <a @click="goLog" href="#">Log in</a>
      </div>
      <div class="wrap-hr">
        <div class="hr"></div>
        <span>or</span>
        <div class="hr"></div>
      </div>
      <button class="btn google">
        <img src="@/assets/google.png" alt="" />
        <span>Log in with Google</span>
      </button>
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
  align-items: center;
  gap: 5px;
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
</style>
