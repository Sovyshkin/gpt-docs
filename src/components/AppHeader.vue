<script setup>
import AppMenu from "./AppMenu.vue";
// import { useMenuStore } from "@/stores/menuStore.ts";

// const menuStore = useMenuStore();
</script>
<template>
  <header class="header">
    <div class="wrap-logo" @click="$router.push({ name: 'chat' })">
      <img class="logo" src="../assets/logo-panel.svg" alt="" />
    </div>
    <AppMenu />
  </header>
</template>
<style scoped>
.header {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrap-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.logo {
  width: 112px;
  height: 55px;
}
</style>
