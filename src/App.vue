<script setup>
import LeftPanel from "./components/LeftPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import AppMessage from "./components/AppMessage.vue";
import { useRoute } from "vue-router";
import { useMenuStore } from "@/stores/menuStore.ts";
import { watch } from "vue";
import WelcomeBack from "./components/auth/WelcomeBack.vue";

const menuStore = useMenuStore();
const route = useRoute();

watch(
  () => route.name,
  (newName) => {
    if (!newName) {
      return;
    }
    menuStore.checkToken();
  }
);

const authChecked = () => {
  try {
    return route.path.includes("auth");
  } catch (err) {
    console.log(err);
  }
};
</script>
<template>
  <AppMessage />
  <div class="main" v-if="!authChecked()">
    <AppHeader class="mobile" />
    <LeftPanel class="dekstop" />
    <transition name="slide" class="mobile">
      <LeftPanel v-if="menuStore.menu" />
    </transition>
    <router-view class="router" v-if="!menuStore.menu"></router-view>
  </div>
  <router-view v-else></router-view>
  <v-dialog max-width="500" v-model="menuStore.welcomeShow" persistent>
    <WelcomeBack />
  </v-dialog>
  <!-- <LeftPanel /> -->
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
#app {
  font-family: "Poppins", serif;
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0em;
  color: #14171f;
  font-style: normal;
  font-family: "Poppins", serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  justify-content: space-evenly;
  padding: 40px;
  width: 100%;
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.card {
  transition: all 500ms ease;
  cursor: pointer;
}
.hr {
  width: 100%;
  height: 1px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}
.miniHR {
  margin: 0 auto;
  width: 85%;
  height: 1px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}

.hrV {
  width: 1px;
  height: 19px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}

.mainWrap {
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
}

.router {
  width: 100%;
  height: 100vh;
  background-color: #f8f9fc;
  overflow-x: hidden;
  overflow-y: scroll;
}

h1 {
  font-size: 24px;
  line-height: 36px;
  font-weight: 400;
  color: #14171f;
}

.headerAdap {
  display: none;
}

/* Анимация появления */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.mobile {
  display: none !important;
}

.dekstop {
  display: block;
}
.center {
  margin: 0 auto;
}

@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }
  .headerAdap {
    display: block;
  }
  .mobile {
    display: flex !important;
  }
  .dekstop {
    display: none !important;
  }
}
</style>
