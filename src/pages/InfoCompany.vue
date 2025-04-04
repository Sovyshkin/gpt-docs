<script setup>
  import { ref, onMounted } from 'vue';
  import AppLoader from '@/components/AppLoader.vue';
  import { useCompanyStore } from '@/stores/companyStore.ts';
  const companyStore = useCompanyStore()

  onMounted(() => {
    companyStore.getCompany()
  })

  const corporateType = ref("Public company by share")
  const currency = ref("USD")
  // const corporateType2 = ref("1234567890")
  const iban = ref("DE89 3704 0044 0532 0130 00")
  const bankId = ref("DEUTDEFFXXX")
  const bank = ref("Deutsche Bank AG")
  const name_surname = ref("Alexander Morozov")
  const titleSole = ref("Director")
  const email = ref("john@mail.com")
  const docs = ref([
    {
      id: 1,
      name: "Document",
      size: "9.23 MB",
    },
    {
      id: 2,
      name: "Document",
      size: "9.23 MB",
    },
  ])

  const banks = () => {
    try {
      return companyStore.gotCompany.individual_details.bank_accounts.length
    } catch (err) {
      console.log(err);
    }
  }

  const signs = () => {
    try {
      return companyStore.gotCompany.signatories.length
    } catch (err) {
      console.log(err);
    }
  }
</script>
<template>
  <div class="wrapper">
    <h1>New company</h1>
    <div class="wrap-back" @click="companyStore.goBack()">
      <img src="../assets/arrow-left.svg" alt="" />
      <span>Back</span>
    </div>
    <div class="wrap-btns">
      <button class="btn">Export in PDF</button>
      <button class="btn edit">Edit company details</button>
    </div>
    <AppLoader class="center" v-if="companyStore.isLoading"/>
    <div class="card" v-else>
      <h2>Company Information</h2>
      <div class="wrap-group info">
        <div class="group">
          <span for="name" class="group-value">Full Company Name</span>
          <span class="group-item">{{ companyStore.gotCompany.name }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Company's Corporate Type</span>
          <span class="group-item">{{ companyStore.gotCompany.type }}</span>
        </div>
      </div>
      <div class="hr"></div>
      <h2>Company's Bank Account Details</h2>
      <div class="wrap-group bank" v-if="banks()">
        <div class="group">
          <span for="name" class="group-value">Currency</span>
          <span class="group-item">{{ currency }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Company's Corporate Type</span>
          <span class="group-item">{{ corporateType }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Beneficiary's IBAN</span>
          <span class="group-item">{{ iban }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Beneficiary's Bank ID</span>
          <span class="group-item">{{ bankId }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Beneficiary's Bank</span>
          <span class="group-item">{{ bank }}</span>
        </div>
      </div>
      <div class="hr"></div>
      <h2>Signatories</h2>
      <div class="wrap-group signatories" v-if="signs()">
        <div class="group">
          <span for="name" class="group-value"
            >Signatory Name and Surname*</span
          >
          <span class="group-item">{{ name_surname }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value"
            >Title of the Sole Signatory</span
          >
          <span class="group-item">{{ titleSole }}</span>
        </div>
        <div class="group">
          <span for="name" class="group-value">Email</span>
          <span class="group-item">{{ email }}</span>
        </div>
      </div>
      <div class="hr"></div>
      <h2>Documents</h2>
      <div class="documents">
        <div class="document" v-for="item in docs" :key="item.id">
          <div class="wrap-info">
            <img class="doc-img" src="../assets/doc.svg" alt="" />
            <div class="doc-info">
              <span class="doc-name">{{ item.name }}</span>
              <span class="doc-size">{{ item.size }}</span>
            </div>
          </div>
          <img class="arrow-right" src="../assets/arrow-right.svg" alt="" />
        </div>
      </div>
      <div class="hr"></div>
      <h2>Logo</h2>
      <div class="avatar">
        <img src="../assets/image.png" alt="" />
      </div>
      <div class="wrap-btns">
        <button class="btn">Next step</button>
      </div>
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
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.wrap-back img {
  height: 20px;
  width: 20px;
}

.wrap-back span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #8c93a6;
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

.info .group {
  width: 50%;
}

.bank {
  gap: 40px;
}

.bank .group,
.signatories .group {
  width: 30%;
}

.wrap-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #8C93A6;
}

.group-item {
  font-size: 16px;
  line-height: 24px;
}
.wrap-btns {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
}

.btn {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  padding: 14.5px 20px;
  border-radius: 8px;
}

.edit {
  color: #fff;
  background-color: rgba(0, 94, 255, 1);
}

.documents {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.document {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #f1f2f4;
  border-radius: 10px;
  padding: 20px;
}

.wrap-info {
  display: flex;
  gap: 10px;
}

.doc-info {
  display: flex;
  flex-direction: column;
}

.doc-name {
  font-size: 16px;
  line-height: 24.4px;
  font-weight: 500;
  letter-spacing: 0em;
}

.doc-size {
  opacity: 70%;
  font-size: 12px;
  line-height: 16.8px;
  letter-spacing: 0em;
}

.avatar img {
  height: 80px;
  width: 80px;
  border-radius: 10px;
  object-fit: cover;
}

@media (max-width: 768px) {
  .wrap-group {
    flex-direction: column;
    gap: 20px;
  }
  .group {
    width: 100% !important;
  }
}
</style>
