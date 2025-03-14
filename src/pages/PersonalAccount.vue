<script>
import PesonalData from "@/components/PesonalData.vue";
import AppCompanies from "@/components/AppCompanies.vue";
export default {
  name: "PersonalAccount",
  components: { PesonalData, AppCompanies },
  data() {
    return {
      active: 2,
    };
  },
  methods: {
    go_add_company() {
      try {
        this.$router.push({ name: "newCompany" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<template>
  <div class="wrapper">
    <div class="wrap-title">
      <h1>Personal account</h1>
      <button @click="go_add_company()" v-if="active == 2" class="btn active">
        Add company
      </button>
    </div>
    <div class="wrap-btns">
      <button
        class="btn"
        @click="active = 1"
        :class="{ active: this.active == 1 }"
      >
        Personal Data
      </button>
      <button
        class="btn"
        @click="active = 2"
        :class="{ active: this.active == 2 }"
      >
        Companies
      </button>
    </div>
    <PesonalData v-if="active == 1" />
    <AppCompanies v-if="active == 2" />
  </div>
</template>
<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px 20px;
}

.wrap-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  padding: 10.5px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  transition: all 500ms ease;
}

.active {
  background-color: #005eff;
  color: #fff;
}

@media (max-width: 600px) {
  .wrap-title {
    flex-direction: column;
    align-items: start;
    gap: 15px;
  }

  .btn {
    width: 50%;
  }
}
</style>
