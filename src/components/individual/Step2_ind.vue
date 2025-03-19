<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();
</script>

<template>
  <div class="card">
    <h2>Account Holder</h2>
    <div class="info" v-if="companyStore.addedBank">
      <div class="wrap-group">
        <div class="group">
          <label for="account_holder_full_name" class="group-value"
            >Account Holder Full Name</label
          >
          <input
            type="text"
            id="account_holder_full_name"
            name="account_holder_full_name"
            v-model="companyStore.account_holder_full_name"
            class="group-item"
            placeholder="John Smith"
          />
        </div>
        <div class="group">
          <label for="bank_account" class="group-value">Bank Account</label>
          <input
            type="text"
            id="bank_account"
            name="bank_account"
            v-model="companyStore.bank_account"
            class="group-item"
            placeholder="Bank account"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="name_of_the_bank" class="group-value"
            >Name of the Bank</label
          >
          <input
            type="text"
            id="name_of_the_bank"
            name="name_of_the_bank"
            v-model="companyStore.name_of_the_bank"
            class="group-item"
            placeholder="Name of the Bank"
          />
        </div>
        <div class="group">
          <label for="currency" class="group-value">Currency</label>
          <select
            id="currency"
            name="currency"
            v-model="companyStore.currency"
            class="group-item"
          >
            <option value="USD">USD</option>
          </select>
        </div>
        <div class="group">
          <label for="bank_identification_code" class="group-value"
            >Bank Identification Code (SWIFT or similar)</label
          >
          <input
            type="text"
            id="bank_identification_code"
            name="bank_identification_code"
            v-model="companyStore.bank_identification_code"
            class="group-item"
            placeholder="SWIFT or similar"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="bank_country" class="group-value">Bank's Country</label>
          <input
            type="text"
            id="bank_country"
            name="bank_country"
            v-model="companyStore.bank_country"
            class="group-item"
            placeholder="Bank's country"
          />
        </div>
        <div class="group">
          <label for="bank_address" class="group-value">Bank Address</label>
          <input
            type="text"
            id="bank_address"
            name="bank_address"
            v-model="companyStore.bank_address"
            class="group-item"
            placeholder="Bank Address"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="account_holders_address" class="group-value"
            >Account Holder's Address</label
          >
          <input
            type="text"
            id="account_holders_address"
            name="account_holders_address"
            v-model="companyStore.account_holders_address"
            class="group-item"
            placeholder="Account Holder's Address"
          />
        </div>
        <div class="group">
          <label for="account_holders_email" class="group-value"
            >Account Holder's Email</label
          >
          <input
            type="text"
            id="account_holders_email"
            name="account_holders_email"
            v-model="companyStore.account_holders_email"
            class="group-item"
            placeholder="Account Holder's Email"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="correspondent_account" class="group-value"
            >Correspondent Account</label
          >
          <input
            type="text"
            id="correspondent_account"
            name="correspondent_account"
            v-model="companyStore.correspondent_account"
            class="group-item"
            placeholder="Correspondent Account"
          />
        </div>
        <div class="group">
          <label for="correspondent_bank" class="group-value"
            >Correspondent Bank</label
          >
          <input
            type="text"
            id="correspondent_bank"
            name="correspondent_bank"
            v-model="companyStore.correspondent_bank"
            class="group-item"
            placeholder="Correspondent Bank"
          />
        </div>
      </div>
      <div class="hr"></div>
    </div>
    <div class="actions">
      <a
        href="#"
        class="add"
        v-if="!companyStore.addedBank"
        @click="companyStore.addedBank = true"
        >Add New Bank Account</a
      >
      <a
        href="#"
        class="delete"
        v-if="companyStore.addedBank"
        @click="companyStore.addedBank = false"
        >Remove Bank Account</a
      >
    </div>
  </div>
</template>
<style scoped>
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

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

a {
  font-weight: 500;
  text-decoration: underline;
}

.add {
  color: #1233ea;
}

.delete {
  color: #df3a44;
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
