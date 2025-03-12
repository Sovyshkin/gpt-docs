<script>
export default {
  name: "NewCompany",
  components: {},
  data() {
    return {
      type: "",
      name: "",
      fullName: "",
      corporateType: "",
      registrationNumber: "",
      residenceCountry: "",
      countryCompany: "",
      taxCountry: "",
      taxPayerId: "",
      vatNumber: "",
      officeAddress: "",
      zipCode: "",
      postalOfficeAddress: "",
      zipCodePostal: "",
      phone: "",
      email: "",
      corporates: [
        "Private company limited by shares",
        "Public company by shares",
        "Public join stock company",
        "Open joint stock company",
        "Public Corporation",
        "Private joint stock company",
      ],
      countries: ["Russia"],
    };
  },
  methods: {
    goBack() {
      try {
        this.$router.go(-1);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <h1>New company</h1>
    <div class="wrap-back" @click="goBack()">
      <img src="../assets/arrow-left.svg" alt="" />
      <span>Back</span>
    </div>
    <div class="card">
      <h2>Company Information</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Type of Company</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="type"
            class="group-item"
            placeholder="Enter your full name"
          />
        </div>
        <div class="group">
          <label for="name" class="group-value">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="group-item"
            placeholder="Enter the Name"
          />
        </div>
      </div>
      <div class="hr"></div>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Full Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="fullName"
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
            v-model="corporateType"
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
            v-model="registrationNumber"
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
            v-model="countryCompany"
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
            v-model="taxCountry"
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
            v-model="taxPayerId"
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
          v-model="vatNumber"
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
            v-model="officeAddress"
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
            v-model="zipCode"
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
            v-model="postalOfficeAddress"
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
            v-model="zipCodePostal"
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
            v-model="phone"
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
            v-model="email"
            class="group-item"
            placeholder="john@mail.com"
          />
        </div>
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
  justify-content: end;
  gap: 10px;
}

.btn {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
  padding: 14.5px 20px;
  border-radius: 8px;
  background-color: rgba(0, 94, 255, 1);
}

.vat {
  width: 100%;
}
</style>
