<script>
import AppLogo from "../AppLogo.vue";
import AppTerms from "../AppTerms.vue";
export default {
  name: "TellUs",
  components: { AppLogo, AppTerms },
  data() {
    return {
      fullname: "",
      date: "",
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
      <h2 class="title">Tell us about yourself.</h2>
      <div class="group">
        <label for="name" class="group-value">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="fullname"
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
          v-model="date"
          class="group-item"
          placeholder="__.__.____"
        />
      </div>
      <span class="desc"
        >By clicking "Continue", you agree to our
        <a href="">terms and conditions</a> and have read our
        <a href="">privacy policy.</a></span
      >
      <button class="btn continue" type="button" @click="goNext()">
        Continue
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
