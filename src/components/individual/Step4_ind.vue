<script setup>
import { useCompanyStore } from "@/stores/companyStore.ts";
const companyStore = useCompanyStore();
</script>

<template>
  <div class="card">
    <h2>Upload documents (e.g., corporate, registration, financial, etc.)</h2>
    <div class="wrap-file">
      <img src="../../assets/file_add.svg" alt="" />
      <label for="file">Drop here files to upload</label>
      <input
        type="file"
        name="file"
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

h2 {
  font-weight: 400;
  font-size: 16px;
  line-height: 19.84px;
  color: #8c93a6;
}

.wrap-file {
  position: relative;
  width: 100%;
  height: 144px;
  padding: 13px 16px;
  border: 1px dashed #dfe3ec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  cursor: pointer;
}

label {
  color: #8c93a6;
}

input[type="file"] {
  position: absolute;
  width: 100%;
  height: 144px;
  border: none;
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
</style>
