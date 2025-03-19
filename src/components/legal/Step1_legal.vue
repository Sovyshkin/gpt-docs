<script setup>
import { ref } from "vue";
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();

const corporates = ref([
  "Private company limited by shares",
  "Public company by shares",
  "Public join stock company",
  "Open joint stock company",
  "Public Corporation",
  "Private joint stock company",
]);
const countries = ref(["Russia"]);
</script>

<template>
  <div class="wrap-group">
    <div class="group">
      <label for="name" class="group-value">Full Company Name</label>
      <input
        type="text"
        id="name"
        name="name"
        v-model="companyStore.fullName"
        class="group-item"
        placeholder="Full company name"
      />
    </div>
    <div class="group">
      <label for="name" class="group-value">Company's Corporate type</label>
      <select
        type="text"
        id="name"
        name="name"
        v-model="companyStore.corporateType"
        class="group-item"
      >
        <option :value="item" v-for="(item, i) in corporates" :key="i">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
  <div class="wrap-group">
    <div class="group">
      <label for="registrationNumber" class="group-value"
        >Registration Number</label
      >
      <input
        type="text"
        id="registrationNumber"
        name="registrationNumber"
        v-model="companyStore.registrationNumber"
        class="group-item"
        placeholder="123456789"
      />
    </div>
    <div class="group">
      <label for="countryCompany" class="group-value"
        >Country of the Company</label
      >
      <select
        type="text"
        id="countryCompany"
        name="countryCompany"
        v-model="companyStore.countryCompany"
        class="group-item"
      >
        <option :value="item" v-for="(item, i) in countries" :key="i">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
  <div class="wrap-group">
    <div class="group">
      <label for="taxCountry" class="group-value"
        >Company's Tax Residence Country</label
      >
      <select
        type="text"
        id="taxCountry"
        name="taxCountry"
        v-model="companyStore.taxCountry"
        class="group-item"
      >
        <option :value="item" v-for="(item, i) in countries" :key="i">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="group">
      <label for="taxPayerId" class="group-value">Taxpayer ID Code</label>
      <input
        type="text"
        id="taxPayerId"
        name="taxPayerId"
        v-model="companyStore.taxPayerId"
        class="group-item"
        placeholder="123456789"
      />
    </div>
  </div>
  <div class="group vat">
    <label for="vatNumber" class="group-value">VAT Number</label>
    <input
      type="text"
      id="vatNumber"
      name="vatNumber"
      v-model="companyStore.vatNumber"
      class="group-item"
      placeholder="123456789"
    />
  </div>
  <div class="hr"></div>
  <div class="wrap-group">
    <div class="group">
      <label for="officeAddress" class="group-value"
        >Registered Office Address of the Company</label
      >
      <input
        type="text"
        id="officeAddress"
        name="officeAddress"
        v-model="companyStore.officeAddress"
        class="group-item"
        placeholder="Address"
      />
    </div>
    <div class="group">
      <label for="zipCode" class="group-value">Zip Code</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        v-model="companyStore.zipCode"
        class="group-item"
        placeholder="123456789"
      />
    </div>
  </div>
  <div class="wrap-group">
    <div class="group">
      <label for="postalOfficeAddress" class="group-value"
        >Postal Office Address</label
      >
      <input
        type="text"
        id="postalOfficeAddress"
        name="postalOfficeAddress"
        v-model="companyStore.postalOfficeAddress"
        class="group-item"
        placeholder="Address"
      />
    </div>
    <div class="group">
      <label for="zipCodePostal" class="group-value">Zip Code</label>
      <input
        type="text"
        id="zipCodePostal"
        name="zipCodePostal"
        v-model="companyStore.zipCodePostal"
        class="group-item"
        placeholder="123456789"
      />
    </div>
  </div>
  <div class="wrap-group">
    <div class="group">
      <label for="phone" class="group-value">Phone Number</label>
      <input
        type="text"
        id="phone"
        name="phone"
        v-model="companyStore.phone"
        class="group-item"
        placeholder="+7"
      />
    </div>
    <div class="group">
      <label for="email" class="group-value">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        v-model="companyStore.email"
        class="group-item"
        placeholder="john@mail.com"
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
