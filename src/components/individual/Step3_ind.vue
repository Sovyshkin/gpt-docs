<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();
</script>

<template>
  <div class="card">
    <h2>Signatories</h2>
    <div class="info" v-if="companyStore.addedSign">
      <div class="wrap-group">
        <div class="group">
          <label for="signatory_name_and_surname" class="group-value"
            >Signatory Name and Surname</label
          >
          <input
            type="text"
            id="signatory_name_and_surname"
            name="signatory_name_and_surname"
            v-model="companyStore.signatory_name_and_surname"
            class="group-item"
            placeholder="Signatory Name and Surname"
          />
        </div>
        <div class="group">
          <label for="title_of_the_sole_signatory" class="group-value"
            >Title of the Sole Signatory</label
          >
          <select
            id="title_of_the_sole_signatory"
            name="title_of_the_sole_signatory"
            v-model="companyStore.title_of_the_sole_signatory"
            class="group-item"
          >
            <option value="Director">Director</option>
          </select>
        </div>
      </div>
      <div class="group email">
        <label for="email" class="group-value">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="companyStore.email"
          class="group-item"
          placeholder="john@gmail.com"
        />
      </div>
      <div class="wrap-file">
        <div class="file-upload">
          <label for="file">Upload signatures</label>
          <input
            type="file"
            id="file"
            @change="companyStore.handleFileChange"
          />
        </div>
        <div class="doc-file" v-if="companyStore.selectedFile.size">
          <img class="doc-img" src="@/assets/doc.svg" alt="" />
          <div class="doc-info">
            <span class="doc-name">{{ companyStore.selectedFile.name }}</span>
            <span class="doc-size"
              >{{ (companyStore.selectedFile.size / 1024).toFixed(2) }} KB</span
            >
          </div>
          <img
            src="@/assets/delete.png"
            class="delete"
            @click="companyStore.clearFile"
            alt=""
          />
        </div>
      </div>
      <div class="hr"></div>
    </div>
    <div class="actions">
      <a
        href="#"
        class="add"
        v-if="!companyStore.addedSign"
        @click="companyStore.addedSign = true"
        >Add signatory</a
      >
      <a
        href="#"
        class="remove"
        v-if="companyStore.addedSign"
        @click="companyStore.addedSign = false"
        >Remove signatory</a
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
.email {
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

.wrap-file {
  display: flex;
  align-items: center;
  gap: 20px;
}

label {
  cursor: pointer;
}

.file-upload {
  cursor: pointer;
  background-color: #f8f9fc;
  border-radius: 8px;
  padding: 10.5px 20px;
  border: 1px solid #f8f9fc;
}

input[type="file"] {
  cursor: pointer;
  border: none;
  display: none;
  opacity: 0;
}
.doc-file {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #f1f2f4;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
}

.doc-info {
  display: flex;
  flex-direction: column;
}

.doc-name {
  font-size: 12px;
  line-height: 16.4px;
  font-weight: 500;
  letter-spacing: 0em;
}

.doc-size {
  opacity: 70%;
  font-size: 10px;
  line-height: 16.8px;
  letter-spacing: 0em;
}

.doc-img {
  width: 24px;
  height: 24px;
}

.delete {
  width: 18px;
  height: 18px;
  cursor: pointer;
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

.remove {
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
