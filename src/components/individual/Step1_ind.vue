<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();
</script>

<template>
  <div class="wrap-group">
    <div class="group">
      <label for="name" class="group-value">Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="companyStore.fullName"
        class="group-item"
        placeholder="Full name"
      />
    </div>
    <div class="group">
      <label for="passportNumber" class="group-value">Passport Number</label>
      <input
        type="text"
        id="passportNumber"
        name="passportNumber"
        v-model="companyStore.passportNumber"
        class="group-item"
        placeholder="8080 656565"
      />
    </div>
  </div>
  <div class="wrap-group">
    <div class="group">
      <label for="dob" class="group-value">DoB</label>
      <input
        type="date"
        id="dob"
        name="dob"
        v-model="companyStore.dob"
        class="group-item"
        placeholder="__.__.____"
      />
    </div>
    <div class="group">
      <label for="registerAddress" class="group-value"
        >Registered Address</label
      >
      <input
        type="text"
        id="registerAddress"
        name="registerAddress"
        v-model="companyStore.registerAddress"
        class="group-item"
        placeholder="123456789"
      />
    </div>
  </div>
</template>
<style scoped>
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
@media (max-width: 500px) {
  .wrap-group {
    flex-direction: column;
  }
  .group {
    width: 100%;
  }
}
</style>
