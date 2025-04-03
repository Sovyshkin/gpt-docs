<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();
</script>

<template>
  <div class="card">
    <h2>Company's Bank Account Details</h2>
    <div class="info" v-if="companyStore.addedBank">
      <div class="group beneficiary_name">
        <label for="beneficiary_name" class="group-value"
          >Beneficiary Name</label
        >
        <input
          type="text"
          id="beneficiary_name"
          name="beneficiary_name"
          v-model="companyStore.beneficiary_name"
          class="group-item"
          placeholder="Beneficiary name"
        />
      </div>
      <div class="wrap-group">
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
          <label for="beneficiary_account_no" class="group-value"
            >Beneficiary's Account No</label
          >
          <input
            type="text"
            id="beneficiary_account_no"
            name="beneficiary_account_no"
            v-model="companyStore.beneficiary_account_no"
            class="group-item"
            placeholder="Beneficiary's account no"
          />
        </div>
        <div class="group">
          <label for="beneficiary_iban" class="group-value"
            >Beneficiary's IBAN</label
          >
          <input
            type="text"
            id="beneficiary_iban"
            name="beneficiary_iban"
            v-model="companyStore.beneficiary_iban"
            class="group-item"
            placeholder="Beneficiary's IBAN"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="beneficiary_bank_id" class="group-value"
            >Beneficiary's Bank ID</label
          >
          <input
            type="text"
            id="beneficiary_bank_id"
            name="beneficiary_bank_id"
            v-model="companyStore.beneficiary_bank_id"
            class="group-item"
            placeholder="ID bank"
          />
        </div>
        <div class="group">
          <label for="beneficiary_bank" class="group-value"
            >Beneficiary's Bank</label
          >
          <input
            type="text"
            id="beneficiary_bank"
            name="beneficiary_bank"
            v-model="companyStore.beneficiary_bank"
            class="group-item"
            placeholder="Beneficiary's bank"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="beneficiary_bank_country" class="group-value"
            >Beneficiary's Bank Country</label
          >
          <input
            type="text"
            id="beneficiary_bank_country"
            name="beneficiary_bank_country"
            v-model="companyStore.beneficiary_bank_country"
            class="group-item"
            placeholder="Beneficiary's Bank Country"
          />
        </div>
        <div class="group">
          <label for="beneficiary_bank_address" class="group-value"
            >Beneficiary's Bank Address</label
          >
          <input
            type="text"
            id="beneficiary_bank_address"
            name="beneficiary_bank_address"
            v-model="companyStore.beneficiary_bank_address"
            class="group-item"
            placeholder="Beneficiary's Bank Address"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="beneficiary_tax_id" class="group-value"
            >Beneficiary's Tax ID</label
          >
          <input
            type="text"
            id="beneficiary_tax_id"
            name="beneficiary_tax_id"
            v-model="companyStore.beneficiary_tax_id"
            class="group-item"
            placeholder="Beneficiary's Tax ID"
          />
        </div>
        <div class="group">
          <label for="beneficiary_bank_swift" class="group-value"
            >Beneficiary's Bank SWIFT</label
          >
          <input
            type="text"
            id="beneficiary_bank_swift"
            name="beneficiary_bank_swift"
            v-model="companyStore.beneficiary_bank_swift"
            class="group-item"
            placeholder="Beneficiary's Bank SWIFT"
          />
        </div>
      </div>
      <div class="hr"></div>
      <div class="wrap-group">
        <div class="group">
          <label for="correspondent_bank_name" class="group-value"
            >Correspondent Bank name</label
          >
          <input
            type="text"
            id="correspondent_bank_name"
            name="correspondent_bank_name"
            v-model="companyStore.correspondent_bank_name"
            class="group-item"
            placeholder="Correspondent Bank name"
          />
        </div>
        <div class="group">
          <label for="correspondent_bank_address" class="group-value"
            >Correspondent Bank Address</label
          >
          <input
            type="text"
            id="correspondent_bank_address"
            name="correspondent_bank_address"
            v-model="companyStore.correspondent_bank_address"
            class="group-item"
            placeholder="Correspondent Bank Address"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="correspondent_bank_account_no" class="group-value"
            >Correspondent Bank Account No</label
          >
          <input
            type="text"
            id="correspondent_bank_account_no"
            name="correspondent_bank_account_no"
            v-model="companyStore.correspondent_bank_account_no"
            class="group-item"
            placeholder="Correspondent Bank Account No"
          />
        </div>
        <div class="group">
          <label for="correspondent_bank_aba" class="group-value"
            >Correspondent Bank ABA</label
          >
          <input
            type="text"
            id="correspondent_bank_aba"
            name="correspondent_bank_aba"
            v-model="companyStore.correspondent_bank_aba"
            class="group-item"
            placeholder="Correspondent Bank ABA"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="correspondent_bank_swift" class="group-value"
            >Correspondent Bank SWIFT</label
          >
          <input
            type="text"
            id="correspondent_bank_swift"
            name="correspondent_bank_swift"
            v-model="companyStore.correspondent_bank_swift"
            class="group-item"
            placeholder="Correspondent Bank SWIFT"
          />
        </div>
        <div class="group">
          <label
            for="beneficiary_bank_account_with_the_correspondent_bank"
            class="group-value"
            >Beneficiary's Bank Account with the Correspondent bank</label
          >
          <input
            type="text"
            id="beneficiary_bank_account_with_the_correspondent_bank"
            name="beneficiary_bank_account_with_the_correspondent_bank"
            v-model="
              companyStore.beneficiary_bank_account_with_the_correspondent_bank
            "
            class="group-item"
            placeholder="Beneficiary's Bank Account with the Correspondent bank"
          />
        </div>
      </div>
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
.beneficiary_name {
  width: 100%;
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
