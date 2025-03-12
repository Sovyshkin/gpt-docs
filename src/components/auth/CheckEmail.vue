<script>
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
export default {
  name: "CheckEmail",
  components: { AppLogo, AppTerms },
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {},
  mounted() {},
};
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <div class="wrap-title">
        <h2 class="title">Check your email</h2>
        <span class="subtitle"
          >Enter your email address and we will send you instructions on how to
          reset your password.</span
        >
      </div>
      <div class="group">
        <label for="email" class="group-value">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          class="group-item"
          placeholder="john@gmail.com"
          @blur="saveEmail"
        />
      </div>
      <button class="btn continue" type="button" @click="goNext()">
        Continue
      </button>
      <button class="btn back" type="button" @click="goBack()">Back</button>
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

.sendAgain {
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #8c93a6;
  text-decoration: underline;
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
