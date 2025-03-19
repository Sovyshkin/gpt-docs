<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
import { useRouter } from "vue-router";
import AppLoader from "@/components/AppLoader.vue";
import Step1_ind from "@/components/individual/Step1_ind";
import Step2_ind from "@/components/individual/Step2_ind";
import Step3_ind from "@/components/individual/Step3_ind";
import Step4_ind from "@/components/individual/Step4_ind";
import Step1_legal from "@/components/legal/Step1_legal";
import Step2_legal from "@/components/legal/Step2_legal";
import Step5_legal from "@/components/legal/Step5_legal";

const companyStore = useCompanyStore();
const router = useRouter();

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
    <h1>New company</h1>
    <div class="wrap-back" @click="goBack()">
      <img src="../assets/arrow-left.svg" alt="" />
      <span>Back</span>
    </div>
    <div class="card" v-if="companyStore.step == 1">
      <h2>Company Information</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Type of Company</label>
          <select
            type="text"
            id="name"
            name="name"
            v-model="companyStore.type"
            class="group-item"
          >
            <option value="legal">Legal entity</option>
            <option value="individual">Individual</option>
          </select>
        </div>
        <div class="group">
          <label for="name" class="group-value">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="companyStore.name"
            class="group-item"
            placeholder="Enter the Name"
          />
        </div>
      </div>
      <div class="hr"></div>
      <Step1_ind
        v-if="companyStore.type == 'individual' && companyStore.step == 1"
      />
      <Step1_legal v-if="companyStore.type == 'legal'" />
    </div>
    <Step2_legal
      v-if="companyStore.type == 'legal' && companyStore.step == 2"
    />
    <Step2_ind
      v-if="companyStore.type == 'individual' && companyStore.step == 2"
    />
    <Step3_ind v-if="companyStore.step == 3" />
    <Step4_ind v-if="companyStore.step == 4" />
    <Step5_legal
      v-if="companyStore.type == 'legal' && companyStore.step == 5"
    />
    <div class="wrap-btns">
      <button
        class="btn back"
        @click="companyStore.backStep()"
        :class="{ show: companyStore.step > 1 }"
      >
        Back
      </button>
      <button
        class="btn next"
        v-if="!companyStore.isLoading"
        @click="companyStore.nextStep()"
      >
        Next step
      </button>
      <AppLoader v-else />
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
}

.wrap-back {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
}

.wrap-back img {
  height: 20px;
  width: 20px;
  cursor: pointer;
}

.wrap-back span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #8c93a6;
  cursor: pointer;
}

.card {
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #fff;
  border: 1px solid rgba(115, 122, 140, 0.1);
  border-radius: 10px;
}

h2 {
  font-weight: 400;
  font-size: 16px;
  line-height: 19.84px;
  color: #8c93a6;
}

.wrap-group {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;
}

.group {
  position: relative;
  width: 50%;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  padding: 10.5px 20px;
  border-radius: 8px;
}

.back {
  color: #14171f;
  background-color: #fff;
  border: 1px solid rgba(115, 122, 140, 0.1);
  opacity: 0;
}

.next {
  color: #fff;
  background-color: rgba(0, 94, 255, 1);
}

.show {
  opacity: 1;
}

.vat {
  width: 100%;
}
@media (max-width: 500px) {
  .wrap-group {
    flex-direction: column;
  }
  .group {
    width: 100%;
  }
}
</style>
@/stores/companyStore
